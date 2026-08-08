# CasesTask

A case management UI built with Angular 22.1.3 and Tailwind CSS.

This project includes a paginated cases page with search, filter tabs, and list/grid display modes. It uses mock case data from a service and supports Arabic translation via `@ngx-translate`.

## What this project implements

- A root shell layout with sidebar, navbar, and routed main content.
- A case page at `/case` with a default redirect from the app root.
- Case listing in both table and card grid views.
- Search filter and status tabs: all, ongoing, urgent, and finished.
- Pagination across mock pages of case data.
- Mock case data provided by `src/app/features/cases/service/case.service.ts`.
- Localization using `@ngx-translate` with translation files under `src/app/i18n`.
- UI built for Arabic display and bidirectional layout support.

## Key files

- `src/app/app.routes.ts` - app routing configuration.
- `src/app/core/component/shell/shell.component.ts` - root layout component.
- `src/app/features/cases/components/cases/cases.component.ts` - cases page logic and UI behavior.
- `src/app/features/cases/service/case.service.ts` - mock cases data provider.
- `src/app/shared/component/table/table.component.ts` - shared table component used for list view.
- `src/app/shared/component/pagination/pagination.component.ts` - pagination controls.

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start or ng serve
```

Open the app in your browser:

```text
http://localhost:4200/
```

## Build

Build the project for production:

```bash
npm run build or ng serve
```

The production build artifacts are output to the `dist/` directory.
## Deployment

A GitHub Actions workflow is configured in `.github/workflows/deploy.yml`.
When code is pushed to the `dev` branch, the `build-and-deploy` job runs and deploys the app to GitHub Pages.

## Environment

- Angular CLI: 22.1.3
- Angular framework packages: ^22.1.0
- Recommended Node.js: 20.x
- Package manager: npm 11.19.0

## Decisions and trade-offs

- Used mock data in `CaseService` so UI behavior can be reviewed without a backend.
- Implemented list and grid views together to match the expected case management layout.
- Kept action handlers scaffolded for future extension rather than implementing incomplete behavior.
- Chose `@ngx-translate` for localization support while keeping translation keys simple.
- Assumed Figma intended a focused case dashboard with search, filter tabs, and pagination, not a full case detail flow.
- Prioritized Arabic-first styling and directionality given the app content and translation setup.

## Notes

- Case data is currently hardcoded in `CaseService` and paginated across two pages.
- Some action handlers in the cases page are scaffolded but not fully implemented.
- The UI uses Arabic translations and can be extended for more languages.
