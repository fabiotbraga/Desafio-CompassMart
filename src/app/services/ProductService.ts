import BarcodesExist from '../errors/findBarcodeError';
import IdProductExist from '../errors/idProductError';
import { IProductResponse, IProduct, IProductUpdate, IProductResponseUpdate, IProductPaginate } from '../interfaces/IProduct';
import ProductRepository from '../repositories/ProductRepository';
import { ObjectId, PaginateResult } from 'mongoose';

class ProductService {
  async create(payload: IProduct): Promise<IProductResponse> {
    const findByBarcodes = await ProductRepository.findByBarcodes(payload.barcodes);
    if (findByBarcodes) throw new BarcodesExist();
    const result = await ProductRepository.create(payload);
    return result;
  }

  async findAll (query: IProductPaginate, page: any): Promise<PaginateResult<IProductPaginate>> {
    return await ProductRepository.findAll(query, page || 1);
  }
  //teste
  async busca (): Promise<IProductResponse[] | null> {
    return await ProductRepository.busca();
  }

  async findById (id: ObjectId): Promise<IProductResponse | null> {
    const result = await ProductRepository.findById(id);
    if (result == null) throw new IdProductExist();
    return result;
  }

  async lowStock (page: any): Promise<PaginateResult<IProductPaginate>> {
    return await ProductRepository.lowStock(page || 1);
  }

  async updateProduct (id: ObjectId, payload: IProductUpdate): Promise<IProductResponseUpdate|null> {
    const result = await ProductRepository.update(id, payload);
    if (result == null) throw new IdProductExist();
    return result;
  }

  async delete (id: ObjectId): Promise<IProductResponse | null> {
    const result = await ProductRepository.delete(id);
    if (result == null) throw new IdProductExist();
    return result;
  }
}

export default new ProductService()