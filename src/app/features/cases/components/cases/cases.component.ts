import { JsonPipe, NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { PaginationComponent } from "../../../../shared/component/pagination/pagination.component";
import { CaseService } from '../../service/case.service';
import { TableComponent } from "../../../../shared/component/table/table.component";
import { TableConfig } from '../../../../shared/models/table';
import { CaseItem } from '../../models/cases';

@Component({
  selector: 'app-cases',
  imports: [TranslatePipe, PaginationComponent, TableComponent],
  templateUrl: './cases.component.html'
})
export class CasesComponent {
  readonly translateService = inject(TranslateService)
  readonly casesService = inject(CaseService);
  searchQuery = signal<string>('');
  activeTab = signal<string>('all');
  currentPage = signal<number>(1);
  currentLang = signal<string>('ar');
  readonly cases = computed(() => {
    const page = this.currentPage();
    return this.casesService.getCases(page);
  });


  filterTabs = [
    { key: 'all', translationKey: 'filters.all' },
    { key: 'ongoing', translationKey: 'filters.ongoing' },
    { key: 'urgent', translationKey: 'filters.urgent' },
    { key: 'finished', translationKey: 'filters.finished' }
  ];

  filteredCases = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const tab = this.activeTab();
    const casesList = this.cases()?.data || [];
    return casesList.filter((c) => {
      const matchesSearch =
        !query ||
        c.id.toLowerCase().includes(query) ||
        c.title.toLowerCase().includes(query) ||
        c.party1.toLowerCase().includes(query) ||
        c.party2.toLowerCase().includes(query);

      const matchesTab = tab === 'all' || c.statusKey === tab;

      return matchesSearch && matchesTab;
    });
  });

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  casesTableConfig: TableConfig<CaseItem> = {
    trackByKey: 'id',
    emptyMessageKey: 'common.noCases',
    selectable: true,
    showActions: true,
    columns: [
      { key: 'id', labelKey: 'table.caseNumber', type: 'text', sortable: true },
      {
        key: 'title',
        labelKey: 'table.caseTitle',
        type: 'textSub',
        subKey: 'category',
        sortable: true,
      },
      { key: 'stage', labelKey: 'table.stage', type: 'text', sortable: true },
      {
        key: 'parties',
        labelKey: 'table.parties',
        type: 'parties',
        sortable: true,
        parties: {
          separatorLabelKey: 'common.vs',
          getParties: (row) => [
            { name: row.party1, type: row.party1Type },
            { name: row.party2, type: row.party2Type },
          ],
        },
      },
      {
        key: 'statusKey',
        labelKey: 'table.status',
        type: 'badge',
        sortable: true,
        badge: {
          statusKey: 'statusKey',
          translatePrefix: 'filters.',
          classMap: {
            urgent: 'bg-rose-50 text-rose-500',
            ongoing: 'bg-emerald-50 text-emerald-500',
            finished: 'bg-slate-100 text-slate-500',
          },
        },
      },
      {
        key: 'nextDate',
        labelKey: 'table.nextDate',
        type: 'dateIcon',
        sortable: true,
        dateIcon: {
          valueKey: 'nextDateDays',
          unitLabelKey: 'common.days',
          typeKey: 'nextDateType',
        },
      },
    ],
  };

  onRowAction(e: { row: CaseItem; index: number }) {
  }

  onSelectionChange(rows: CaseItem[]) {
  }

  onSortChange(sort: { key: string; direction: 'asc' | 'desc' }) {
  }


}
