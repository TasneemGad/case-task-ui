import { Component, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports:  [TranslatePipe],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  readonly translateService = inject(TranslateService)
  private sidebarService = inject(SidebarService);
  navItems = this.sidebarService.navItems;
  chatHistory = this.sidebarService.chatHistory;
  isCollapsed = signal<boolean>(false);
  currentLang = signal<string>('ar');

  toggleSidebar(): void {
    this.isCollapsed.update(state => !state);
  }
}
