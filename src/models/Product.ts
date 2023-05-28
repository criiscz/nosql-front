import {Review} from "@/models/Review";

export interface Product {
  category: string
  description: string
  features?: string[]
  imageUrl: string
  inStock: boolean
  index: number
  price: number
  productName: string
  rating: number
  reviews: Review[]
  product_name?: string
}