export interface ApiResponse<T> {
  data: T[];
  pagination: PaginatedResponse
}
export interface PaginatedResponse {
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

