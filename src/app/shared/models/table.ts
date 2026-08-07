export type ColumnType =
  | 'text'
  | 'textSub'
  | 'badge'
  | 'parties'
  | 'dateIcon'
  | 'custom';

export type ColumnAlign = 'start' | 'center' | 'end';

export interface BadgeColumnConfig {
  statusKey: string;
  classMap: Record<string, string>;
  translatePrefix?: string;
  defaultClass?: string;
}

export interface PartyItem {
  name: string;
  type?: string;
}

export interface PartiesColumnConfig<T = any> {
  getParties: (row: T) => PartyItem[];
  separatorLabelKey: string;
}

export interface DateIconColumnConfig {
  valueKey: string;
  unitLabelKey: string;
  typeKey: string;
}

export interface TableColumn<T = any> {
  key: string;
  labelKey: string;
  type: ColumnType;
  align?: ColumnAlign;
  sortable?: boolean;
  headerClass?: string;
  cellClass?: string;
  width?: string;
  subKey?: string;
  badge?: BadgeColumnConfig;
  parties?: PartiesColumnConfig;
  dateIcon?: DateIconColumnConfig;
  render?: (row: T) => string;
}

export interface TableConfig<T = any> {
  columns: TableColumn<T>[];
  trackByKey: keyof T | string;
  emptyMessageKey: string;
  selectable?: boolean;
  showActions?: boolean;
  actionsLabelKey?: string;
}

export interface RowActionEvent<T = any> {
  row: T;
  index: number;
}

export interface SortEvent {
  key: string;
  direction: 'asc' | 'desc';
}
