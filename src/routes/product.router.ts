import { Router } from 'express';
import ProductController from '../app/controller/ProductController';
import ProductValidation from '../app/validations/Product/CreateProductValidation'
import UpdateProductValidation from '../app/validations/Product/UpdateProductValidation';
import PatchUpdateProductValidation from '../app/validations/Product/PatchUpdateProductValidation';
import FindByIdProductValidation from '../app/validations/Product/FindByIdValidation';
import deleteProductValidation from '../app/validations/Product/DeleteProductValidation';
import authenticate from '../app/middlewares/auth'
import multer from 'multer';
import auth from '../app/middlewares/auth';

const router = Router();
const multerConfig = multer();
const mainRoute = '/api/v1/product';

router.post(`${mainRoute}/csv`, authenticate, multerConfig.single("file"), ProductController.csv);
router.post(`${mainRoute}`, authenticate, ProductValidation, ProductController.create);
router.patch(`${mainRoute}/:id`, authenticate, PatchUpdateProductValidation, ProductController.update);
router.put(`${mainRoute}/:id`, authenticate, UpdateProductValidation, ProductController.update);
router.get(`${mainRoute}/marketplace/:id`, auth, FindByIdProductValidation, ProductController.marketplace);
router.get(`${mainRoute}/low_stock`, authenticate, ProductController.lowStock);
router.get(`${mainRoute}/:id`, authenticate, FindByIdProductValidation, ProductController.findById);
router.get(`${mainRoute}`, authenticate, ProductController.findAll);
router.delete(`${mainRoute}/:id`, authenticate, deleteProductValidation, ProductController.delete);

export default router;