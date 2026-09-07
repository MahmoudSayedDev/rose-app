export interface ExternalParams {
    page?: number,
    limit?: number,
    categoryId?: string,
    subCategoryId?: string,
    occasionId?: string,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
    isApproved?: boolean,
    isActive?: boolean,
    sortOrder?: string
}
