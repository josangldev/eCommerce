export interface Product {
  id:          number;
  title:       string;
  price:       number;
  description: string;
  category:    Category;
  image:       string;
  rating:      Rating;
  inStock:     boolean;
  onSale:      boolean;
  fastShipping:boolean;
}

export type Category = "men's clothing" | "women's clothing";

export interface Rating {
  rate:  number;
  count: number;
}

export interface CartProduct extends Product {
  quantity: number;
} 