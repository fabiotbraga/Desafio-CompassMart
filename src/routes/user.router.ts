import { Router } from 'express';
import UserController from '../app/controller/UserController';

const router = Router();
const mainRoute = '/api/v1/user';

router.post(`${mainRoute}`, UserController.create);
router.put(`${mainRoute}/:id`, UserController.update);
router.get(`${mainRoute}/:id`, UserController.findById);
router.get(`${mainRoute}`, UserController.findAll);
router.delete(`${mainRoute}/:id`, UserController.delete);
export default router;

