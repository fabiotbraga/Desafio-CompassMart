import { IProductResponse, IProduct, IProductUpdate, IProductResponseUpdate, IProductPaginate, IProductResponseCsv } from '../interfaces/IProduct';
import ProductRepository from '../repositories/ProductRepository';
import { ObjectId, PaginateResult } from 'mongoose';
import { Readable } from 'stream';
import readline from 'readline';
import { IdNotFoundError, ProductsNotFoundError, BarCodeExistsError }  from '../errors/productErrors'

class ProductService {
  async create(payload: IProduct): Promise<IProductResponse> {
    const findByBarcodes = await ProductRepository.findByBarcodes(payload.bar_codes);
    if (findByBarcodes) throw new BarCodeExistsError();
    const result = await ProductRepository.create(payload);
    return result;
  }

  async csv(buffer: string): Promise<IProductResponseCsv> {
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const productLine = readline.createInterface({
        input: readableFile
    });
    const products: IProduct[] = [];

    for await (let line of productLine) {
        const productLineSplit = line.split(",");
        products.push({
            title: productLineSplit[0],
            description: productLineSplit[1],
            department: productLineSplit[2],
            brand: productLineSplit[3],
            price: Number(productLineSplit[4]),
            qtd_stock: Number(productLineSplit[5]),
            bar_codes: productLineSplit[6],
            stock_control_enabled: true
        })
      }
      products.shift();
    let errors_details: Array<object> = [];
    let CountRegisteredProducts = 0;
    
    for await (let product of products) {
      const errors: string[] = [];
      const findByBarcodes = await ProductRepository.findByBarcodes(product.bar_codes);
      //csv middlewares
      //title
      if (product.title == null) {
          errors.push('title field is null');
        }
      //description 
      if (product.description == null) {
        errors.push('description field is null');
        }
      //department 
      if (product.department == null) {
        errors.push('departament field is null');
        }
      //brand 
      if (product.brand == null) {
        errors.push('brand field is null');
        }
      //price 
      if (isNaN(product.price) || null || product.price == 0) {
        errors.push('price field is invalid');
        }
      if (product.price < 0.01 || product.price > 1000) {
        errors.push('price must be between 0.01 and 1000');
        }
      //qtd_stock 
      if (!product.qtd_stock) {
        errors.push('qtd_stock field is null');
        }
      if (product.qtd_stock < 1 || product.qtd_stock > 100000) {
        errors.push('qtd_stock must be between 1 and 100000');
        }
      //bar_codes 
      if (product.bar_codes == null) {
        errors.push('barcode field is null');
        } 
      if (product.bar_codes.length !== 13 ) {
        errors.push('Barcodes min digit 13');
        }
      if ((isNaN(Number(product.bar_codes))) ) {
        errors.push('Barcodes format invalid');
        } 
      if (findByBarcodes) {
        errors.push('Barcodes already exist.');
        } 
      errors.length >= 1 ? errors_details.push({ title: product.title, bar_codes: product.bar_codes, errors})
            : CountRegisteredProducts += 1; await ProductRepository.csv(product);
      }
    return {
      sucess: CountRegisteredProducts,
      errors: errors_details.length,
      errors_details,
    } 
  }

  async findAll (query: IProductPaginate): Promise<PaginateResult<IProductPaginate>> {
    const result = await ProductRepository.findAll(query);
    if (result.totalDocs === 0) throw new ProductsNotFoundError()
    return result

  }
  
  async findById (id: ObjectId): Promise<IProductResponse | null> {
    const result = await ProductRepository.findById(id);
    if (result === null) throw new IdNotFoundError();
    return result;
  }

  async lowStock (page: IProductPaginate): Promise<PaginateResult<IProductPaginate>> {
    return await ProductRepository.lowStock(page);
  }

  async updateProduct (id: ObjectId, payload: IProductUpdate): Promise<IProductResponseUpdate|null> {
    const result = await ProductRepository.update(id, payload);
    if (result == null) throw new IdNotFoundError();
    return result;
  }

  async delete (id: ObjectId): Promise<IProductResponse | null> {
    const result = await ProductRepository.delete(id);
    if (result == null) throw new IdNotFoundError();
    return result;
  }
}

export default new ProductService()