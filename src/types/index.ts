export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  location: 'France' | 'Algérie';
  available: boolean;
  featured?: boolean;
  promo?: boolean;
  details: ProductDetails;
  createdAt: Date;
  sizes?: string[];
  marketDays?: string[];
}

export type ProductCategory = 'baskets' | 'vetements' | 'voitures' | 'telephones' | 'autres';

export type ProductDetails = 
  | BasketDetails
  | ClothingDetails
  | CarDetails
  | PhoneDetails
  | OtherDetails;

export interface BasketDetails {
  size: string;
  brand: string;
  condition: 'neuf' | 'comme neuf' | 'bon état' | 'usé';
  quantity: number;
}

export interface ClothingDetails {
  size: string;
  brand: string;
  type: string;
  color: string;
  condition: 'neuf' | 'comme neuf' | 'bon état' | 'usé';
}

export interface CarDetails {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: 'essence' | 'diesel' | 'électrique' | 'hybride' | 'autre';
}

export interface PhoneDetails {
  brand: string;
  model: string;
  condition: 'neuf' | 'comme neuf' | 'bon état' | 'usé';
  storage: string;
  color: string;
}

export interface OtherDetails {
  condition: 'neuf' | 'comme neuf' | 'bon état' | 'usé';
  [key: string]: any;
}

export interface Order {
  id: string;
  product: Product;
  customerName: string;
  whatsapp: string;
  address?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface SellerRequest {
  id: string;
  type: string;
  description: string;
  price: number;
  location: 'France' | 'Algérie';
  images: string[];
  whatsapp: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}