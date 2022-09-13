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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const stream_1 = require("stream");
const readline_1 = __importDefault(require("readline"));
const productErrors_1 = require("../errors/productErrors");
const mapper_json_1 = __importDefault(require("../mapper/mapper.json"));
class ProductService {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const findByBarcodes = yield ProductRepository_1.default.findByBarcodes(payload.bar_codes);
            if (findByBarcodes)
                throw new productErrors_1.BarCodeExistsError();
            const result = yield ProductRepository_1.default.create(payload);
            return result;
        });
    }
    csv(buffer) {
        var e_1, _a, e_2, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const readableFile = new stream_1.Readable();
            readableFile.push(buffer);
            readableFile.push(null);
            const productLine = readline_1.default.createInterface({
                input: readableFile
            });
            const products = [];
            try {
                for (var productLine_1 = __asyncValues(productLine), productLine_1_1; productLine_1_1 = yield productLine_1.next(), !productLine_1_1.done;) {
                    let line = productLine_1_1.value;
                    const productLineSplit = line.split(",");
                    products.push({
                        title: productLineSplit[0],
                        description: productLineSplit[1],
                        department: productLineSplit[2],
                        brand: productLineSplit[3],
                        price: Number(productLineSplit[4]),
                        qtd_stock: Number(productLineSplit[5]),
                        bar_codes: productLineSplit[6],
                        stock_control_enabled: true
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (productLine_1_1 && !productLine_1_1.done && (_a = productLine_1.return)) yield _a.call(productLine_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            products.shift();
            let errors_details = [];
            let CountRegisteredProducts = 0;
            try {
                for (var products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), !products_1_1.done;) {
                    let product = products_1_1.value;
                    const errors = [];
                    const findByBarcodes = yield ProductRepository_1.default.findByBarcodes(product.bar_codes);
                    //csv middlewares
                    //title
                    if (product.title == null) {
                        errors.push('title field is null');
                    }
                    //description 
                    if (product.description == null) {
                        errors.push('description field is null');
                    }
                    //department 
                    if (product.department == null) {
                        errors.push('departament field is null');
                    }
                    //brand 
                    if (product.brand == null) {
                        errors.push('brand field is null');
                    }
                    //price 
                    if (isNaN(product.price) || null || product.price == 0) {
                        errors.push('price field is invalid');
                    }
                    if (product.price < 0.01 || product.price > 1000) {
                        errors.push('price must be between 0.01 and 1000');
                    }
                    //qtd_stock 
                    if (!product.qtd_stock) {
                        errors.push('qtd_stock field is null');
                    }
                    if (product.qtd_stock < 1 || product.qtd_stock > 100000) {
                        errors.push('qtd_stock must be between 1 and 100000');
                    }
                    //bar_codes 
                    if (product.bar_codes == null) {
                        errors.push('barcode field is null');
                    }
                    if (product.bar_codes.length !== 13) {
                        errors.push('Barcodes min digit 13');
                    }
                    if ((isNaN(Number(product.bar_codes)))) {
                        errors.push('Barcodes format invalid');
                    }
                    if (findByBarcodes) {
                        errors.push('Barcodes already exist.');
                    }
                    errors.length >= 1 ? errors_details.push({ title: product.title, bar_codes: product.bar_codes, errors })
                        : CountRegisteredProducts += 1;
                    yield ProductRepository_1.default.csv(product);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (products_1_1 && !products_1_1.done && (_b = products_1.return)) yield _b.call(products_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return {
                sucess: CountRegisteredProducts,
                errors: errors_details.length,
                errors_details,
            };
        });
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.findAll(query);
            if (result.totalDocs === 0)
                throw new productErrors_1.ProductsNotFoundError();
            return result;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.findById(id);
            if (result === null)
                throw new productErrors_1.IdNotFoundError();
            return result;
        });
    }
    marketplace(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.findById(id);
            if (result == null)
                throw new productErrors_1.IdNotFoundError();
            const mapperFields = mapper_json_1.default.fields;
            const productValues = [];
            const marketValues = [];
            const marketIdentifier = [];
            const type = [];
            const optional = [];
            const newProductformat = {};
            const productIdentifier = mapperFields.map(field => {
                const { fieldProduct } = field;
                const productIdentify = fieldProduct.replace('product.', '');
                return productIdentify;
            });
            const marketFields = mapperFields.map(field => {
                const { fieldMarket } = field;
                const marketField = fieldMarket.split('.');
                return marketField;
            });
            for (const value of mapperFields) {
                productValues.push(Object.values(value)[0]);
                marketValues.push(Object.values(value)[1]);
                if (Object.keys(value)[2] === 'type') {
                    type.push(Object.values(value)[2]);
                    optional.push('0');
                }
                else {
                    type.push(Object.values(value)[3]);
                }
                if (Object.keys(value)[2] === 'optional') {
                    optional.push(Object.values(value)[2]);
                }
            }
            for (let index in marketFields) {
                marketIdentifier.push(marketValues[index].split('.')[marketFields[index].length - 1]);
            }
            for (let index in productValues) {
                if (type[index] === 'text') {
                    newProductformat[marketIdentifier[index]] = (_a = (result[productIdentifier[index]])) === null || _a === void 0 ? void 0 : _a.toString();
                }
                else if (type[index] === 'number') {
                    newProductformat[marketIdentifier[index]] = Number(result[productIdentifier[index]]);
                }
                else if (type[index] === 'boolean') {
                    newProductformat[marketIdentifier[index]] = Boolean(result[productIdentifier[index]]);
                }
                else if (type[index] === 'array') {
                    newProductformat[marketIdentifier[index]] = Array(result[productIdentifier[index]]);
                }
                if (optional[index]) {
                    const optionalObj = newProductformat[marketIdentifier[index]].toString();
                    if (optional[index][0] === 'break') {
                        const salt = optional[index][1];
                        newProductformat[marketIdentifier[index]] = optionalObj.match(new RegExp('.{1,' + salt + '}', 'g'));
                    }
                    else if (optional[index][0] === 'currency') {
                        let locale = optional[index][1];
                        let currency = optional[index][2];
                        newProductformat[marketIdentifier[index]] = Number(newProductformat[marketIdentifier[index]]).toLocaleString(locale, { style: 'currency', currency: currency });
                    }
                }
            }
            function formatterProduct(marketFields) {
                const productformatted = {};
                for (const field of marketFields) {
                    let obj = productformatted;
                    for (const salt of field) {
                        obj = obj[salt] = newProductformat[salt] = obj[salt] = newProductformat[salt] || {};
                    }
                }
                return productformatted;
            }
            return (formatterProduct(marketFields));
        });
    }
    lowStock(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.lowStock(page);
            if (result.totalDocs === 0)
                throw new productErrors_1.ProductsNotFoundError();
            return result;
        });
    }
    updateProduct(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.update(id, payload);
            if (result == null)
                throw new productErrors_1.IdNotFoundError();
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductRepository_1.default.delete(id);
            if (result === null)
                throw new productErrors_1.IdNotFoundError();
            return result;
        });
    }
}
exports.default = new ProductService();
