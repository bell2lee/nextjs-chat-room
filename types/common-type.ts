export interface PaginationResult<T> {
  count: number,
  results: T[],
}

export type PaginationParams = {
  limit: number,
  skip: number,
  keyword?: string | null,
};
