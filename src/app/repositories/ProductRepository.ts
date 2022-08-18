import { IProduct, IProductResponse } from '../interfaces/IProduct';
import ProductSchema from '../schemas/ProductSchema';
import { ObjectId } from 'mongoose';

class ProductRepository {
  async create(payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload);
  }

  async findByBarcodes (value: string): Promise<Boolean> {
    const result = await ProductSchema.findOne({ barcodes: value });
    if (result) return true;
    return false;
  }

  async findAll (): Promise<IProductResponse[]> {
    return ProductSchema.find();
  }

  async findById (id: ObjectId): Promise<IProductResponse | null> {
    return ProductSchema.findById({_id: id});
  }

  async delete (id: ObjectId): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndDelete({_id: id});
  }
}

export default new ProductRepository();