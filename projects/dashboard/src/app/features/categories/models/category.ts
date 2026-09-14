import { MainResponse } from '../../../shared/models/main-response';
import { Metadata } from '../../../shared/models/metadata';

export type CategoriesList = MainResponse<CategoriesListPayload>;

export interface CategoriesListPayload {
  data: Category[];
  metadata: Metadata;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
  // products: []
  _count: Count;
}

export interface Count {
  products: number;
  subCategories?: number;
}

export interface SubCategory extends Category {
  categoryId: string;
}

export type SingleCategory = MainResponse<SingleCategoryPayload>;

export interface SingleCategoryPayload {
  category: Category;
}

export interface DeleteCategoryRES {
  status: boolean;
  code: number;
  message: string;
}

export interface CreateCategoryREQ {
  title: string;
  description?: string;
  image?: string;
}
