import { Component, inject, signal } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shell',
  imports: [SidebarComponent, RouterOutlet, NavbarComponent],
  templateUrl: './shell.component.html'
})
export class RootComponent {
  readonly translateService = inject(TranslateService)
  currentLang = signal<string>('ar');

}
