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
  username: string;
  full_name: string;
  email: string;
  password: string;
  avatar: string;
  phone_number: string;
}

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
