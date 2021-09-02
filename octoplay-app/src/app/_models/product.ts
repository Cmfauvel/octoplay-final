export interface Product {
    id?: number;
    name: string;
    description?: string;
    utilisation?: string,
    fabrication?: string;
    price: number;
    stock?: number;
    category_id?: number;
    images?: []
  }