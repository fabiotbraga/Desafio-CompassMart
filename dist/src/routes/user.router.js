"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../app/controller/UserController"));
const userValidation_1 = __importDefault(require("../app/validations/User/userValidation"));
const router = (0, express_1.Router)();
const mainRoute = '/api/v1/user';
router.post(`${mainRoute}`, userValidation_1.default, UserController_1.default.create);
router.post(`${mainRoute}/authenticate`, userValidation_1.default, UserController_1.default.authenticate);
router.get(`${mainRoute}`, UserController_1.default.findAll);
exports.default = router;
