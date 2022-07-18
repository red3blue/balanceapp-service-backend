import { ProductDTO } from "../models/DTO/ProductDTO";
export interface IProductService {
  getAll(): Promise<ProductDTO[] | null>;
}
export const IProductService = Symbol("IProductService");
