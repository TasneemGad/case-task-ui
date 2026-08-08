import { Routes } from '@angular/router';
import { RootComponent } from './core/component/shell/shell.component';

export const routes: Routes = [
  { path: '', redirectTo: 'case', pathMatch: 'full' },

  {
    path: '',
    component: RootComponent,
    data: { breadcrumb: 'الرئيسية' },
    children: [
      {
        path: 'case',
        loadComponent: () =>
          import('../app/features/cases/components/cases/cases.component').then(
            (m) => m.CasesComponent,
          ),
          data: { breadcrumb: 'navigation.cases'  },
      },
    ],
  },

  { path: '**', redirectTo: 'case' },
];
