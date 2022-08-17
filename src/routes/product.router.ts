import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
//import ProductValidation from '../app/validation/product/create-product-validation';
//import UpdateProductValidation from '../app/validation/product/update-product-validation';
//import FindByIdProductValidation from '../app/validation/product/findbyid-product-validation';
//import deleteProductValidation from '../app/validation/product/delete-product-validation';

const router = Router();
const mainRoute = '/api/v1/product';
router.post(`${mainRoute}`, ProductController.create);
export default router;