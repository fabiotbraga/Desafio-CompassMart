import { Router } from 'express';
import UserController from '../app/controller/UserController';
import userValidation from '../app/validations/userValidation';
//import auth from '../app/middlewares/auth';

const router = Router();
const mainRoute = '/api/v1/user';

router.post(`${mainRoute}`, userValidation, UserController.create);
router.post(`${mainRoute}/authenticate`, userValidation, UserController.authenticate)
router.put(`${mainRoute}/:id`, UserController.update);
router.get(`${mainRoute}/:id`, UserController.findById);
router.get(`${mainRoute}`, UserController.findAll);
router.delete(`${mainRoute}/:id`, UserController.delete);
export default router;

