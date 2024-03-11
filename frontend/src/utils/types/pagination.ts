export interface IPagination {
    limit: number,
    page: number,
    totalPages: number,
}

export const INITIAL_PAGINATION = {
    limit:9,
    page:1,
    totalPages:0,
}