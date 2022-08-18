import BarcodesExist from '../errors/findBarcodeError';
import IdProductExist from '../errors/idProductError';
import { IProductResponse, IProduct } from '../interfaces/IProduct';
import ProductRepository from '../repositories/ProductRepository';
import { ObjectId } from 'mongoose';

class ProductService {
  async create(payload: IProduct): Promise<IProductResponse> {
    const findByBarcodes = await ProductRepository.findByBarcodes(payload.barcodes);
    if (findByBarcodes) throw new BarcodesExist();
    const result = await ProductRepository.create(payload);
    return result;
  }

  async findAll (): Promise<IProductResponse[]> {
    return await ProductRepository.findAll();
  }

  async findById (id: ObjectId): Promise<IProductResponse | null> {
    const result = await ProductRepository.findById(id);
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