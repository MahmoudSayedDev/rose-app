import { MainResponse } from "../../../shared/models/main-response"
import { Metadata } from "../../../shared/models/metadata"

export type CategoriesList = MainResponse<CategoriesListPayload>;

export interface CategoriesListPayload {
  data: Category[];
  metadata: Metadata;
}

export interface Category {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  subCategories: any[]
  _count: Count
}

export interface Count {
  products: number
}
