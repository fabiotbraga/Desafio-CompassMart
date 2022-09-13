"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../services/UserService"));
const ObjectId = require('mongodb').ObjectId;
const userErrors_1 = require("../errors/userErrors");
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield UserService_1.default.create({ email, password });
                res.status(201).json(result);
            }
            catch (Error) {
                if (Error instanceof userErrors_1.EmailExistsError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield UserService_1.default.authenticate({ email, password });
                res.status(200).json(result);
            }
            catch (Error) {
                if (Error instanceof userErrors_1.UserNotFound)
                    return res.status(Error.statusCode).json({ Error });
                if (Error instanceof userErrors_1.PasswordInvalid)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserService_1.default.findAll();
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    }
}
exports.default = new UserController();
