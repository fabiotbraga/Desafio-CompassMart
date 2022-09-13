"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userErrors_1 = require("../errors/userErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).send({ Error: new userErrors_1.NoTokenProvided() });
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error)
            return res.status(401).send({ Error: new userErrors_1.TokenInvalid() });
        return next();
    });
};
