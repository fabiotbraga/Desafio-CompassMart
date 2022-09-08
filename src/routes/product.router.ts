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

<<<<<<< HEAD
router.post(`${mainRoute}/csv`,multerConfig.single("file"), ProductController.csv);
router.post(`${mainRoute}`, ProductValidation, ProductController.create);
router.patch(`${mainRoute}/:id`, PatchUpdateProductValidation, ProductController.update);
router.put(`${mainRoute}/:id`, UpdateProductValidation, ProductController.update);
router.get(`${mainRoute}/marketplace/:id`, FindByIdProductValidation, ProductController.marketplace);
router.get(`${mainRoute}/low_stock`, ProductController.lowStock);
router.get(`${mainRoute}/:id`, FindByIdProductValidation, ProductController.findById);
router.get(`${mainRoute}`, ProductController.findAll);
router.delete(`${mainRoute}/:id`, deleteProductValidation, ProductController.delete);
=======
router.post(`${mainRoute}/csv`, authenticate, multerConfig.single("file"), ProductController.csv);
router.post(`${mainRoute}`, authenticate, ProductValidation, ProductController.create);
router.patch(`${mainRoute}/:id`, authenticate, PatchUpdateProductValidation, ProductController.update);
router.put(`${mainRoute}/:id`, authenticate, UpdateProductValidation, ProductController.update);
router.get(`${mainRoute}/low_stock`, authenticate, ProductController.lowStock);
router.get(`${mainRoute}/:id`, authenticate, FindByIdProductValidation, ProductController.findById);
router.get(`${mainRoute}`, authenticate, ProductController.findAll);
router.delete(`${mainRoute}/:id`, authenticate, deleteProductValidation, ProductController.delete);
>>>>>>> development
export default router;