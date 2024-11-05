import { EOrderStatus, EPaymentMethod } from "@/enums";
import { User } from "./index.d";
export interface Banner {
  id: number;
  name: string;
  thumbnail: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: Brand;
  category: Category;
  description: string;
  price: number;
  quantity: number;
  images: string[];
}

export interface User {
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  password: string;
  avatar: string;
  phone_number: string;
}

export type UserResponse = Pick<
  User,
  "user_id" | "full_name" | "username" | "email" | "phone_number" | "avatar"
>;

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EditUserRequest {}

export type Register = Pick<
  User,
  "email" | "full_name" | "username" | "password"
>;

export interface Login {
  usernameOrEmail: string;
  password: string;
}

export interface FormErrors {
  full_name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface ApiResponse {
  message: string;
  data?: any;
}

export interface CartItem {
  product: Product;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  user: UserResponse;
  items: CartItem[];
  totalItems: number;
  totalQuantity: number;
  totalAmount: number;
}

export interface CartRequest {
  productId: number;
  quantity: number;
}

export interface OrderItemResponse {
  product: Product;
  quantity: number;
  price: number;
  total_price: number;
}

export interface OrderResponse {
  id: number;
  user: UserResponse;
  total_price: number;
  payment_method: EPaymentMethod;
  order_date: Date;
  order_status: EOrderStatus;
  order_items: OrderItemResponse[];
}
