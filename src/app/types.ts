export interface GetBooksParams {
  term: string,
  startIndex: number,
  maxResults: number
}
export interface PaginationModel {
  first: number
  page: number
  pageCount: number
  rows: number
}
