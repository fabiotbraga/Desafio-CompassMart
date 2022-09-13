"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger/logger"));
const PORT = 3000;
app_1.default.listen(process.env.PORT || PORT, () => {
    var _a;
    logger_1.default.debug(`Server is up and running @ http://localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : PORT}`);
});
