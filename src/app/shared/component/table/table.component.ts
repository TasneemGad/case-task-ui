import { Component, computed, contentChild, input, output, signal, TemplateRef } from '@angular/core';
import {  PartyItem, RowActionEvent, SortEvent, TableColumn, TableConfig } from '../../models/table';
import { TranslatePipe } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TranslatePipe , NgClass],
  templateUrl: './table.component.html'
})
export class TableComponent<T extends Record<string, any>>{
  data = input.required<T[]>();
  config = input.required<TableConfig<T>>();
  currentLang = input<() => string>(() => 'en');

  rowAction = output<RowActionEvent<T>>();
  selectionChange = output<T[]>();
  sortChange = output<SortEvent>();

  private readonly selectedRows = signal<Set<T>>(new Set());
  private readonly sortState = signal<SortEvent | null>(null);

  readonly allSelected = computed(
    () => this.data().length > 0 && this.selectedRows().size === this.data().length
  );

  readonly dir = computed<'rtl' | 'ltr'>(() =>
    this.currentLang()() === 'ar' ? 'rtl' : 'ltr'
  );

  trackByFn = (_: number, row: T) => {
    const key = this.config().trackByKey as string;
    return row[key];
  };

  isSelected(row: T): boolean {
    return this.selectedRows().has(row);
  }

  toggleRow(row: T): void {
    const next = new Set(this.selectedRows());
    next.has(row) ? next.delete(row) : next.add(row);
    this.selectedRows.set(next);
    this.selectionChange.emit(Array.from(next));
  }

  toggleAll(): void {
    if (this.allSelected()) {
      this.selectedRows.set(new Set());
      this.selectionChange.emit([]);
    } else {
      const next = new Set(this.data());
      this.selectedRows.set(next);
      this.selectionChange.emit(Array.from(next));
    }
  }

  onSort(col: TableColumn<T>): void {
    if (!col.sortable) return;
    const current = this.sortState();
    const direction: 'asc' | 'desc' =
      current?.key === col.key && current.direction === 'asc' ? 'desc' : 'asc';
    const next = { key: col.key, direction };
    this.sortState.set(next);
    this.sortChange.emit(next);
  }

  onRowAction(row: T, index: number): void {
    this.rowAction.emit({ row, index });
  }

  getValue(row: T, key: string): any {
    return key.split('.').reduce((acc, part) => acc?.[part], row);
  }

  getBadgeClass(col: TableColumn<T>, row: T): string {
    const cfg = col.badge!;
    const value = this.getValue(row, cfg.statusKey);
    return cfg.classMap[value] ?? cfg.defaultClass ?? 'bg-slate-100 text-slate-500';
  }

  getBadgeLabelKey(col: TableColumn<T>, row: T): string {
    const cfg = col.badge!;
    const value = this.getValue(row, cfg.statusKey);
    return `${cfg.translatePrefix ?? ''}${value}`;
  }

  getCustomValue(col: TableColumn<T>, row: T): string {
    return col.render ? col.render(row) : '';
  }

  getParties(col: TableColumn<T>, row: T): PartyItem[] {
    return col.parties?.getParties(row) ?? [];
  }
}
