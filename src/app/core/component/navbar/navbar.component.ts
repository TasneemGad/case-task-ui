import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly translateService = inject(TranslateService)
  currentLang = signal<string>('ar');
  breadcrumbs = signal<BreadcrumbItem[]>([]);

  ngOnInit(): void {
    this.updateBreadcrumbs();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumbs();
    });
  }

  private updateBreadcrumbs(): void {
    const items: BreadcrumbItem[] = [];
    let currentRoute: ActivatedRoute | null = this.route.root;
    let url = '';

    while (currentRoute) {
      const children: ActivatedRoute[] = currentRoute.children;
      currentRoute = null;
      for (const child of children) {
        if (child.outlet === 'primary') {
          const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
          if (routeURL !== '') {
            url += `/${routeURL}`;
          }
          const label = child.snapshot.data['breadcrumb'];
          if (label) {
            items.push({ label, url });
          }

          currentRoute = child;
          break;
        }
      }
    }

    this.breadcrumbs.set(items);
  }
}
export interface BreadcrumbItem {
  label: string;
  url: string;
}
