"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
(0, winston_1.addColors)(colors);
const Logger = (0, winston_1.createLogger)({
    level: level(),
    levels,
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            dirname: 'logs',
            filename: 'error.log',
            level: 'error',
        }),
        new winston_1.transports.File({ filename: 'logs/all.log' }),
    ],
    format: winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })),
});
exports.default = Logger;
