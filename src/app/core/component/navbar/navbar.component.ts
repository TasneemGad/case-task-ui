import { Component, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    readonly translateService = inject(TranslateService)
  currentLang = signal<string>('ar');
}
