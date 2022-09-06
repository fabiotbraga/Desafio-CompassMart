import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
import ProductValidation from '../app/validations/product/CreateProductValidation';
import UpdateProductValidation from '../app/validations/product/UpdateProductValidation';
import PatchUpdateProductValidation from '../app/validations/product/PatchUpdateProductValidation';
import FindByIdProductValidation from '../app/validations/product/FindByIdValidation';
import deleteProductValidation from '../app/validationS/product/DeleteProductValidation';
import authenticate from '../app/middlewares/auth'
import multer from 'multer';

const router = Router();
const multerConfig = multer();
const mainRoute = '/api/v1/product';

router.post(`${mainRoute}/csv`, authenticate, multerConfig.single("file"), ProductController.csv);
router.post(`${mainRoute}`, authenticate, ProductValidation, ProductController.create);
router.patch(`${mainRoute}/:id`, authenticate, PatchUpdateProductValidation, ProductController.update);
router.put(`${mainRoute}/:id`, authenticate, UpdateProductValidation, ProductController.update);
router.get(`${mainRoute}/low_stock`, authenticate, ProductController.lowStock);
router.get(`${mainRoute}/:id`, authenticate, FindByIdProductValidation, ProductController.findById);
router.get(`${mainRoute}`, authenticate, ProductController.findAll);
router.delete(`${mainRoute}/:id`, authenticate, deleteProductValidation, ProductController.delete);
export default router;