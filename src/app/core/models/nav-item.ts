export interface NavItem {
  key: string;
  title?: string;
  iconPath: string;
  link: string;
  isActive?: boolean;
}

export interface ChatHistoryItem {
  id: string | number;
  title: string;
}
