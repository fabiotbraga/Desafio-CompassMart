import {
  IProductResponse,
  IProduct,
  IProductUpdate,
  IProductResponseUpdate,
  IProductPaginate,
  IProductResponseCsv
} from "../interfaces/IProduct";
import ProductRepository from "../repositories/ProductRepository";
import { ObjectId, PaginateResult } from "mongoose";
import { Readable } from "stream";
import readline from "readline";
import {
  IdNotFoundError,
  ProductsNotFoundError,
  BarCodeExistsError
} from "../errors/productErrors";
import mapper from "../mapper/mapper.json";

class ProductService {
  async create(payload: IProduct): Promise<IProductResponse> {
    const findByBarcodes = await ProductRepository.findByBarcodes(
      payload.bar_codes
    );
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

    for await (const line of productLine) {
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
      });
    }
    products.shift();
    const errors_details: Array<object> = [];
    let CountRegisteredProducts = 0;

    for await (const product of products) {
      const errors: string[] = [];
      const findByBarcodes = await ProductRepository.findByBarcodes(
        product.bar_codes
      );
      //csv middlewares
      //title
      if (product.title == null) {
        errors.push("title field is null");
      }
      //description
      if (product.description == null) {
        errors.push("description field is null");
      }
      //department
      if (product.department == null) {
        errors.push("departament field is null");
      }
      //brand
      if (product.brand == null) {
        errors.push("brand field is null");
      }
      //price
      if (isNaN(product.price) || null || product.price == 0) {
        errors.push("price field is invalid");
      }
      if (product.price < 0.01 || product.price > 1000) {
        errors.push("price must be between 0.01 and 1000");
      }
      //qtd_stock
      if (!product.qtd_stock) {
        errors.push("qtd_stock field is null");
      }
      if (product.qtd_stock < 1 || product.qtd_stock > 100000) {
        errors.push("qtd_stock must be between 1 and 100000");
      }
      //bar_codes
      if (product.bar_codes == null) {
        errors.push("barcode field is null");
      }
      if (product.bar_codes.length !== 13) {
        errors.push("Barcodes min digit 13");
      }
      if (isNaN(Number(product.bar_codes))) {
        errors.push("Barcodes format invalid");
      }
      if (findByBarcodes) {
        errors.push("Barcodes already exist.");
      }
      errors.length >= 1
        ? errors_details.push({
            title: product.title,
            bar_codes: product.bar_codes,
            errors
          })
        : (CountRegisteredProducts += 1);
      await ProductRepository.csv(product);
    }
    return {
      sucess: CountRegisteredProducts,
      errors: errors_details.length,
      errors_details
    };
  }

  async findAll(
    query: IProductPaginate
  ): Promise<PaginateResult<IProductPaginate>> {
    const result = await ProductRepository.findAll(query);
    if (result.totalDocs === 0) throw new ProductsNotFoundError();
    return result;
  }

  async findById(id: ObjectId): Promise<IProductResponse | null> {
    const result = await ProductRepository.findById(id);
    if (result === null) throw new IdNotFoundError();
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async marketplace(id: ObjectId): Promise<any> {
    const result = await ProductRepository.findById(id);
    if (result == null) throw new IdNotFoundError();

    const mapperFields = mapper.fields;
    const productValues: Array<string> = [];
    const marketValues: Array<string> = [];
    const marketIdentifier: Array<string> = [];
    const type: Array<string> = [];
    const optional: Array<string> = [];
    const newProductformat = {};

    const productIdentifier = mapperFields.map((field) => {
      const { fieldProduct } = field;
      const productIdentify = fieldProduct.replace("product.", "");
      return productIdentify;
    });

    const marketFields = mapperFields.map((field) => {
      const { fieldMarket } = field;
      const marketField = fieldMarket.split(".");
      return marketField;
    });

    for (const value of mapperFields) {
      productValues.push(Object.values(value)[0]);
      marketValues.push(Object.values(value)[1]);
      if (Object.keys(value)[2] === "type") {
        type.push(Object.values(value)[2]);
        optional.push("0");
      } else {
        type.push(Object.values(value)[3]);
      }
      if (Object.keys(value)[2] === "optional") {
        optional.push(Object.values(value)[2]);
      }
    }

    for (const index in marketFields) {
      marketIdentifier.push(
        marketValues[index].split(".")[marketFields[index].length - 1]
      );
    }
    for (const index in productValues) {
      if (type[index] === "text") {
        newProductformat[marketIdentifier[index]] =
          result[productIdentifier[index]]?.toString();
      } else if (type[index] === "number") {
        newProductformat[marketIdentifier[index]] = Number(
          result[productIdentifier[index]]
        );
      } else if (type[index] === "boolean") {
        newProductformat[marketIdentifier[index]] = Boolean(
          result[productIdentifier[index]]
        );
      } else if (type[index] === "array") {
        newProductformat[marketIdentifier[index]] = Array(
          result[productIdentifier[index]]
        );
      }
      if (optional[index]) {
        const optionalObj =
          newProductformat[marketIdentifier[index]].toString();
        if (optional[index][0] === "break") {
          const salt = optional[index][1];
          newProductformat[marketIdentifier[index]] = optionalObj.match(
            new RegExp(".{1," + salt + "}", "g")
          );
        } else if (optional[index][0] === "currency") {
          const locale = optional[index][1];
          const currency = optional[index][2];
          newProductformat[marketIdentifier[index]] = Number(
            newProductformat[marketIdentifier[index]]
          ).toLocaleString(locale, { style: "currency", currency: currency });
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function formatterProduct(marketFields: any) {
      const productformatted = {};
      for (const field of marketFields) {
        let obj = productformatted;
        for (const salt of field) {
          obj =
            obj[salt] =
            newProductformat[salt] =
            obj[salt] =
              newProductformat[salt] || {};
        }
      }
      return productformatted;
    }

    return formatterProduct(marketFields);
  }

  async lowStock(
    page: IProductPaginate
  ): Promise<PaginateResult<IProductPaginate>> {
    const result = await ProductRepository.lowStock(page);
    if (result.totalDocs === 0) throw new ProductsNotFoundError();
    return result;
  }

  async updateProduct(
    id: ObjectId,
    payload: IProductUpdate
  ): Promise<IProductResponseUpdate | null> {
    const result = await ProductRepository.update(id, payload);
    if (result == null) throw new IdNotFoundError();
    return result;
  }

  async delete(id: ObjectId): Promise<IProductResponse | null> {
    const result = await ProductRepository.delete(id);
    if (result === null) throw new IdNotFoundError();
    return result;
  }
}

export default new ProductService();
