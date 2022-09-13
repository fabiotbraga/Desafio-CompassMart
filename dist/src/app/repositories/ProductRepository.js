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
const ProductSchema_1 = __importDefault(require("../schemas/ProductSchema"));
const ValidateProduct_1 = __importDefault(require("../utils/ValidateProduct"));
class ProductRepository {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductSchema_1.default.create(payload);
        });
    }
    csv(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductSchema_1.default.insertMany(file);
        });
    }
    findByBarcodes(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductSchema_1.default.findOne({ bar_codes: value });
            if (result)
                return true;
            return false;
        });
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryall = {
                department: { $regex: query.department || '' },
                brand: { $regex: query.brand || '' },
                stock_control_enabled: true
            };
            const options = {
                page: query.page || 1,
                limit: 50,
                customLabels: ValidateProduct_1.default
            };
            const products = yield ProductSchema_1.default.paginate(queryall, options);
            return products;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductSchema_1.default.findById({ _id: id });
        });
    }
    lowStock(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const querylow = {
                stock_control_enabled: true,
                qtd_stock: { $lt: 100 }
            };
            const options = {
                page: page.page || 1,
                limit: 50,
                sort: { qtd_stock: 1 },
                customLabels: ValidateProduct_1.default
            };
            const products = yield ProductSchema_1.default.paginate(querylow, options);
            return products;
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ProductSchema_1.default.findOneAndUpdate({ _id: id }, payload, { returnOriginal: false });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return ProductSchema_1.default.findByIdAndDelete({ _id: id });
        });
    }
}
exports.default = new ProductRepository();
