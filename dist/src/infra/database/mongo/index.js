"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: process.env.NODE_ENV === 'test'
        ? path_1.default.resolve('.env.test')
        : path_1.default.resolve('.env')
});
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.${process.env.URL_ID}.mongodb.net/${process.env.DB_NAME}`);
        mongoose_1.default.connection.on('error', console.log.bind(console, 'Error connection'));
        mongoose_1.default.connection.once('open', () => {
            console.log('Connected database.');
        });
        return mongoose_1.default.connection;
    }
}
exports.default = new Database().connect;
