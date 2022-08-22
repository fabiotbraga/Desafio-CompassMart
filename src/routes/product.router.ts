import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
import ProductValidation from '../app/validations/product/CreateProductValidation';
import UpdateProductValidation from '../app/validations/product/UpdateProductValidation';
import PatchUpdateProductValidation from '../app/validations/product/PatchUpdateProductValidation';
import FindByIdProductValidation from '../app/validations/product/FindByIdValidation';
import deleteProductValidation from '../app/validationS/product/DeleteProductValidation';

const router = Router();
const mainRoute = '/api/v1/product';
router.post(`${mainRoute}`, ProductValidation, ProductController.create);
router.patch(`${mainRoute}/:id`, PatchUpdateProductValidation, ProductController.update);
router.put(`${mainRoute}/:id`, UpdateProductValidation, ProductController.update);
router.get(`${mainRoute}/low_stock`, ProductController.lowStock);
router.get(`${mainRoute}/busca`, ProductController.busca); //teste
router.get(`${mainRoute}/:id`, FindByIdProductValidation, ProductController.findById);
router.get(`${mainRoute}`, ProductController.findAll);
router.delete(`${mainRoute}/:id`, deleteProductValidation, ProductController.delete);
export default router;