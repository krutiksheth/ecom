export type ProductParams = {
    orderBy: string;
    searchTerm?: string;
    brands: string[];
    types: string[];
    page: number;
    pageSize: number;
}