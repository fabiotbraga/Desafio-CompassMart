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
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const userErrors_1 = require("../errors/userErrors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class UserService {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify = yield UserRepository_1.default.verifyEmail(payload.email);
            if (verify !== null)
                throw new userErrors_1.EmailExistsError();
            payload.password = yield bcrypt.hash(payload.password, Number(process.env.SALT));
            const payloadUser = yield UserRepository_1.default.create(payload);
            const result = {
                id: payloadUser.id,
                email: payloadUser.email,
            };
            return result;
        });
    }
    authenticate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const verify = yield UserRepository_1.default.verifyEmail(payload.email);
            if (verify === null)
                throw new userErrors_1.UserNotFound();
            const verifyPass = yield bcrypt.compare(payload.password, verify.password);
            if (!verifyPass)
                throw new userErrors_1.PasswordInvalid();
            const token = jwt.sign({ id: verify.id }, process.env.JWT_KEY, {
                expiresIn: process.env.EXPIRE_IN
            });
            const result = { email: verify.email, token: token };
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.findAll();
        });
    }
}
exports.default = new UserService();
