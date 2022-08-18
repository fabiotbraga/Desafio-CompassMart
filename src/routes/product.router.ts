import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
import ProductValidation from '../app/validations/product/CreateProductValidation';
//import UpdateProductValidation from '../app/validation/product/update-product-validation';
import FindByIdProductValidation from '../app/validations/product/FindByIdValidation';
import deleteProductValidation from '../app/validationS/product/DeleteProductValidation';

const router = Router();
const mainRoute = '/api/v1/product';
router.post(`${mainRoute}`, ProductValidation, ProductController.create);
router.get(`${mainRoute}/:id`, FindByIdProductValidation, ProductController.findById);
router.get(`${mainRoute}`, ProductController.findAll);
router.delete(`${mainRoute}/:id`, deleteProductValidation, ProductController.delete);
export default router;