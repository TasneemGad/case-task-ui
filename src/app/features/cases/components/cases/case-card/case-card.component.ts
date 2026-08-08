import { Component, input, output } from '@angular/core';
import { CaseItem } from '../../../models/cases';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-case-card',
  imports: [TranslatePipe],
  templateUrl: './case-card.component.html'
})
export class CaseCardComponent {
   item = input.required<CaseItem>();

  menuClick = output<CaseItem['id']>();

  onMenuClick(): void {
    this.menuClick.emit(this.item().id);
  }
}
