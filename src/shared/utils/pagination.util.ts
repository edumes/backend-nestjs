import { PaginatedResult } from '../interfaces/paginated-result.interface';

export function paginateResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResult<T> {
  return {
    data,
    meta: {
      total,
      page,
      limit,
    },
  };
}