import { IProduct, IProductPaginate, IProductResponse, IProductResponseUpdate, IProductUpdate } from '../interfaces/IProduct';
import ProductSchema from '../schemas/ProductSchema';
import { ObjectId } from 'mongoose';
import { PaginateResult } from 'mongoose';
import myCustomLabels from '../utils/ValidateProduct'

class ProductRepository {
  async create(payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload);
  }

  async findByBarcodes (value: string): Promise<Boolean> {
    const result = await ProductSchema.findOne({ barcodes: value });
    if (result) return true;
    return false;
  }

  async findAll (query: IProductPaginate , page: any): Promise<PaginateResult<IProductPaginate>> {
    const queryl = {
      departament: { $regex: query.departament || ''},
      brand: { $regex: query.brand || ''},
      stock_control_enabled: true
    }
    const options = {
      page: page || 1,
      limit: 50,
      customLabels: myCustomLabels
    };
    const products = await ProductSchema.paginate(queryl, options);
    return products;
  }
  //teste
  async busca (): Promise<IProductResponse[] | null> {
    return ProductSchema.find();
  }

  async findById (id: ObjectId): Promise<IProductResponse | null> {
    return ProductSchema.findById({_id: id});
  }

  async lowStock (): Promise<IProductResponse[]> {
    return ProductSchema.find().where('qtd_stock').lt(100).where('stock_control_enabled').equals(true).sort({qtd_stock: 1});
  }

  async update (id: ObjectId, payload: IProductUpdate): Promise<IProductResponseUpdate | null> {
    return await ProductSchema.findOneAndUpdate({ _id: id }, payload, {returnOriginal: false});
  }

  async delete (id: ObjectId): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndDelete({_id: id});
  }
}

export default new ProductRepository();