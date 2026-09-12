import { ProductCardBadge } from "reusable-components"
import { MainResponse } from "../../../shared/models/main-response"
import { Metadata } from "../../../shared/models/metadata"
import { Category, SubCategory } from "../../categories/models/category";

export type ProductsList = MainResponse<ProductsListPayload>;

export interface ProductsListPayload {
  data: Product[];
  metadata: Metadata;
}

export type SingleProduct = MainResponse<SingleProductPayload>;

export interface SingleProductPayload {
  product: Product;
}

export interface Product {
  id: string
  title: string
  description: string
  rating: number | string
  ratings: number | string
  stock: number | string
  price: number | string
  priceWithDiscount?: number // +
  discountType: string
  discountValue: string
  cover: string
  gallery: string
  categoryId: string
  subCategoryId?: string
  immutable: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt?: string | Date
  category: Category
  subCategory?: SubCategory
  occasions: Occasions[]
  _count: Count
  tags?: ProductCardBadge[]
}

// export interface Category {
//   id: string
//   title: string
// }

// export interface SubCategory {
//   id: string
//   title: string
// }

export interface Occasions {
  id: string
  productId: string
  occasionId: string
  createdAt: string
  occasion: Occasion
}

export interface Occasion {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
}

export interface Count {
  reviews: number
  cartItems: number
  wishlistItems: number
}

export interface CreateProductRequest {
  title: string;
  description: string;
  stock: number;
  price: number;
  discountType: string;
  discountValue: number;
  categoryId: string;
  occasionIds: []
  cover: string;
  gallery: any[];
}

export interface DeleteProductResponse {
  status: boolean;
  code: number;
  message: string;
  payload: string;
}
