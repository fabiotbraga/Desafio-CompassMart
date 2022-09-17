import ProductService from "../services/ProductService";
import { Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require("mongodb").ObjectId;
import {
  IdNotFoundError,
  ProductsNotFoundError,
  BarCodeExistsError,
  FileNotFoundError
} from "../errors/productErrors";

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        department,
        brand,
        price,
        qtd_stock,
        bar_codes
      } = req.body;
      if (req.body.qtd_stock > 0) {
        const result = await ProductService.create({
          title,
          description,
          department,
          brand,
          price,
          qtd_stock,
          bar_codes,
          stock_control_enabled: true
        });
        return res.status(201).json(result);
      } else {
        const result = await ProductService.create({
          title,
          description,
          department,
          brand,
          price,
          qtd_stock,
          bar_codes,
          stock_control_enabled: false
        });
        return res.status(201).json(result);
      }
    } catch (Error) {
      if (Error instanceof BarCodeExistsError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async csv(req: Request, res: Response) {
    try {
      const { file } = req;
      const buffer = file?.buffer.toString("utf-8");
      if (buffer === undefined) throw new FileNotFoundError();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await ProductService.csv(buffer!);
      return res.status(200).json(result);
    } catch (Error) {
      if (Error instanceof FileNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      if (Error instanceof FileNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const query = req.query;
      const result = await ProductService.findAll(query);
      return res.status(200).json(result);
    } catch (Error) {
      if (Error instanceof ProductsNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async lowStock(req: Request, res: Response) {
    try {
      const page = req.query;
      const result = await ProductService.lowStock(page || 1);
      return res.status(200).json(result);
    } catch (Error) {
      if (Error instanceof ProductsNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      const result = await ProductService.findById(id);
      return res.status(200).json(result);
    } catch (Error) {
      if (Error instanceof IdNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async marketplace(req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      const result = await ProductService.marketplace(id);
      return res.status(200).json(result);
    } catch (Error) {
      if (Error instanceof IdNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      const { title, description, department, brand, price, qtd_stock } =
        req.body;
      if (req.body.qtd_stock > 0) {
        const result = await ProductService.updateProduct(id, {
          title,
          description,
          department,
          brand,
          price,
          qtd_stock,
          stock_control_enabled: true
        });
        return res.status(200).json(result);
      } else {
        const result = await ProductService.updateProduct(id, {
          title,
          description,
          department,
          brand,
          price,
          qtd_stock,
          stock_control_enabled: false
        });
        return res.status(200).json(result);
      }
    } catch (Error) {
      if (Error instanceof IdNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      await ProductService.delete(id);
      return res.status(204).json();
    } catch (Error) {
      if (Error instanceof IdNotFoundError)
        return res.status(Error.statusCode).json({ Error });
      return res.status(500).json(Error);
    }
  }
}

export default new ProductController();
