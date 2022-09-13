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
const mongoose_1 = require("mongoose");
const productErrors_1 = require("../../errors/productErrors");
const joi_1 = __importDefault(require("joi"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const isValid = mongoose_1.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new productErrors_1.IdInvalidError();
        const schema = joi_1.default.object({
            title: joi_1.default.string().required().trim(),
            description: joi_1.default.string().required().trim(),
            department: joi_1.default.string().required().trim(),
            brand: joi_1.default.string().required().trim(),
            price: joi_1.default.number().required().min(0.01).max(1000),
            qtd_stock: joi_1.default.number().required().max(100000),
        });
        const { error } = yield schema.validate(req.body, { abortEarly: true });
        if (error) {
            return res.status(400).json({
                message: 'Validation Error',
                description: error.details.map((description) => (description.message))
            });
        }
        return next();
    }
    catch (Error) {
        if (Error instanceof productErrors_1.IdInvalidError)
            return res.status(Error.statusCode).json({ Error });
        return res.status(400).json(Error);
    }
});
