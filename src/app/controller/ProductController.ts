import ProductService from '../services/ProductService';

class ProductController {
  async create(req, res) {
    try {
      const { title, description, brand, price, qtd_stock, barcodes } = req.body;
      const result = await ProductService.create({ title, description, brand, price, qtd_stock, barcodes});
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new ProductController();