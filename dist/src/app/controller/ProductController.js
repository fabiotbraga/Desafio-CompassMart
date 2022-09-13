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
const ProductService_1 = __importDefault(require("../services/ProductService"));
const ObjectId = require('mongodb').ObjectId;
const productErrors_1 = require("../errors/productErrors");
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, department, brand, price, qtd_stock, bar_codes } = req.body;
                if (req.body.qtd_stock > 0) {
                    const result = yield ProductService_1.default.create({ title, description, department, brand, price, qtd_stock, bar_codes, stock_control_enabled: true });
                    return res.status(201).json(result);
                }
                else {
                    const result = yield ProductService_1.default.create({ title, description, department, brand, price, qtd_stock, bar_codes, stock_control_enabled: false });
                    return res.status(201).json(result);
                }
            }
            catch (Error) {
                if (Error instanceof productErrors_1.BarCodeExistsError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    csv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { file } = req;
                const buffer = file === null || file === void 0 ? void 0 : file.buffer.toString("utf-8");
                if (buffer === undefined)
                    throw new productErrors_1.FileNotFoundError();
                const result = yield ProductService_1.default.csv(buffer);
                return res.status(200).json(result);
            }
            catch (Error) {
                if (Error instanceof productErrors_1.FileNotFoundError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const result = yield ProductService_1.default.findAll(query);
                return res.status(200).json(result);
            }
            catch (Error) {
                if (Error instanceof productErrors_1.ProductsNotFoundError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    lowStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query;
                const result = yield ProductService_1.default.lowStock(page || 1);
                return res.status(200).json(result);
            }
            catch (Error) {
                if (Error instanceof productErrors_1.ProductsNotFoundError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                const result = yield ProductService_1.default.findById(id);
                return res.status(200).json(result);
            }
            catch (Error) {
                if (Error instanceof productErrors_1.IdNotFoundError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    marketplace(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                const result = yield ProductService_1.default.marketplace(id);
                return res.status(200).json(result);
            }
            catch (Error) {
                if (Error instanceof productErrors_1.IdNotFoundError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                const { title, description, department, brand, price, qtd_stock } = req.body;
                if (req.body.qtd_stock > 0) {
                    const result = yield ProductService_1.default.updateProduct(id, { title, description, department, brand, price, qtd_stock, stock_control_enabled: true });
                    return res.status(200).json(result);
                }
                else {
                    const result = yield ProductService_1.default.updateProduct(id, { title, description, department, brand, price, qtd_stock, stock_control_enabled: false });
                    return res.status(200).json(result);
                }
            }
            catch (Error) {
                if (Error instanceof productErrors_1.IdNotFoundError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new ObjectId(req.params.id);
                yield ProductService_1.default.delete(id);
                return res.status(204).json();
            }
            catch (Error) {
                if (Error instanceof productErrors_1.IdNotFoundError)
                    return res.status(Error.statusCode).json({ Error });
                return res.status(500).json(Error);
            }
        });
    }
}
exports.default = new ProductController();
