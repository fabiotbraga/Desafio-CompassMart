import { IProduct, IProductPaginate, IProductResponse, IProductResponseUpdate, IProductUpdate } from '../interfaces/IProduct';
import ProductSchema from '../schemas/ProductSchema';
import { ObjectId } from 'mongoose';
import { PaginateResult } from 'mongoose';
import myCustomLabels from '../utils/ValidateProduct'
class ProductRepository {
  async create(payload: IProduct): Promise<IProductResponse> {
    return ProductSchema.create(payload);
  }

  async csv(file: IProduct): Promise<IProductResponse[]> {
    return ProductSchema.insertMany(file);
  }

  async findByBarcodes (value: string): Promise<Boolean> {
    const result = await ProductSchema.findOne({ barcodes: value });
    if (result) return true;
    return false;
  }

  async findAll (query: IProductPaginate): Promise<PaginateResult<IProductPaginate>> {
    const queryall = {
      departament: { $regex: query.departament || ''},
      brand: { $regex: query.brand || ''},
      stock_control_enabled: true
    }
    const options = {
      page: query.page || 1,
      limit: 50,
      customLabels: myCustomLabels
    };
    const products = await ProductSchema.paginate(queryall, options);
    return products;
  }
  //teste
  async busca (): Promise<IProductResponse[] | null> {
    return ProductSchema.find();
  }

  async findById (id: ObjectId): Promise<IProductResponse | null> {
    return ProductSchema.findById({_id: id});
  }

  async lowStock (page: IProductPaginate): Promise<PaginateResult<IProductPaginate>> {
    const querylow = {
      stock_control_enabled: true,
      qtd_stock: { $lt: 100 }
    }
    const options = {
      page: page.page || 1,
      limit: 50,
      sort: {qtd_stock: 1},
      customLabels: myCustomLabels
    };
    const products = await ProductSchema.paginate(querylow, options);
    return products;
  }

  async update (id: ObjectId, payload: IProductUpdate): Promise<IProductResponseUpdate | null> {
    return await ProductSchema.findOneAndUpdate({ _id: id }, payload, {returnOriginal: false});
  }

  async delete (id: ObjectId): Promise<IProductResponse | null> {
    return ProductSchema.findByIdAndDelete({_id: id});
  }
}

export default new ProductRepository();