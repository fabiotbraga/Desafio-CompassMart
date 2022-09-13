import { createLogger, transports, format, addColors } from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white"
};

addColors(colors);

const Logger = createLogger({
  level: level(),
  levels,
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: "logs",
      filename: "error.log",
      level: "error"
    }),
    new transports.File({ filename: "logs/all.log" })
  ],
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  )
});

export default Logger;
