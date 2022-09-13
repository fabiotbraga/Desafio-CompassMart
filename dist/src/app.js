"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_router_1 = __importDefault(require("./routes/index.router"));
require("./infra/database/mongo/index");
require("dotenv/config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const morgan_1 = __importDefault(require("./logger/morgan"));
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.express.use(express_1.default.json({}));
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use((0, cors_1.default)());
        this.express.use('/api/v1/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.express.use(morgan_1.default);
    }
    routes() {
        this.express.use(...index_router_1.default);
    }
}
exports.default = new App().express;
