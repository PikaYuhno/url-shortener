"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.createConnection = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.createConnection = () => {
    const sequelize = new sequelize_1.Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PASSWORD, {
        host: "localhost",
        dialect: "postgres",
    });
    return sequelize;
};
exports.sequelize = exports.createConnection();
