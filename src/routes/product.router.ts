import { Router } from "express";
import ProductController from "../app/controller/ProductController";
import ProductValidation from "../app/validations/Product/CreateProductValidation";
import UpdateProductValidation from "../app/validations/Product/UpdateProductValidation";
import PatchUpdateProductValidation from "../app/validations/Product/PatchUpdateProductValidation";
import FindByIdProductValidation from "../app/validations/Product/FindByIdValidation";
import deleteProductValidation from "../app/validations/Product/DeleteProductValidation";
import authenticate from "../app/middlewares/auth";
import multer from "multer";
import auth from "../app/middlewares/auth";
import { FileBigError, FileTypeError } from "../app/errors/productErrors";

const router = Router();
const multerConfig = multer({
  limits: { fileSize: 14000 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "text/csv") {
      return cb(new FileTypeError());
    }
    if (file.size > 14000) {
      return cb(new FileBigError());
    }
    cb(null, true);
  }
});

const mainRoute = "/api/v1/product";
const multerMiddleware = function uploadFile(req, res, next) {
  const upload = multerConfig.single("file");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ err });
    } else if (err) {
      return res.status(500).json(err);
    }
    next();
  });
};

router.post(
  `${mainRoute}/csv`,
  authenticate,
  multerMiddleware,
  ProductController.csv
);
router.post(
  `${mainRoute}`,
  authenticate,
  ProductValidation,
  ProductController.create
);
router.patch(
  `${mainRoute}/:id`,
  authenticate,
  PatchUpdateProductValidation,
  ProductController.update
);
router.put(
  `${mainRoute}/:id`,
  authenticate,
  UpdateProductValidation,
  ProductController.update
);
router.get(
  `${mainRoute}/marketplace/:id`,
  auth,
  FindByIdProductValidation,
  ProductController.marketplace
);
router.get(`${mainRoute}/low_stock`, authenticate, ProductController.lowStock);
router.get(
  `${mainRoute}/:id`,
  authenticate,
  FindByIdProductValidation,
  ProductController.findById
);
router.get(`${mainRoute}`, authenticate, ProductController.findAll);
router.delete(
  `${mainRoute}/:id`,
  authenticate,
  deleteProductValidation,
  ProductController.delete
);

export default router;
