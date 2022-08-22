import { Product } from "../entities/Product";
export interface IProductRepository {
  getAll(): Promise<Product[] | null>;
}
