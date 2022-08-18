import ProductService from '../services/ProductService';
import { Request, Response } from 'express';
const ObjectId = require('mongodb').ObjectId;

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const { title, description, departament, brand, price, qtd_stock, barcodes, stock_control_enabled } = req.body;
      if ( req.body.qtd_stock > 0) {
        const result = await ProductService.create({ title, description, departament, brand, price, qtd_stock, barcodes, stock_control_enabled: true});
        return res.status(201).json(result);
      } else {
        const result = await ProductService.create({ title, description, departament, brand, price, qtd_stock, barcodes});
        return res.status(201).json(result);
      }
      
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async findAll (req: Request, res: Response) {
    try {
      const result = await ProductService.findAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async findById (req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      const result = await ProductService.findById(id);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      await ProductService.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new ProductController();