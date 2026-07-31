export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: 'Maxi Dress' | 'Midi Dress' | 'Mini Dress' | 'Floral Dress' | 'Evening Dress' | 'Casual Dress' | 'Office Dress' | 'Party Dress' | 'Summer Dress' | 'Satin Dress';
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: ProductColor[];
  material: string;
  careInstructions?: string;
  stock: number;
  thumbnail: string;
  galleryImages: string[];
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string; // Unique combination of product.id + size + color
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  verified: boolean;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  total: number;
}
