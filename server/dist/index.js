"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = require("./db/connection");
const url_1 = __importDefault(require("./api/url"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = express_1.default();
const PORT = process.env.PORT || 4000;
/**
 * TODO:
 * + Add Vue.js
 *
 *
 */
const connectionTest = async () => {
    let retries = 5;
    while (retries > 0) {
        try {
            connection_1.createConnection();
            await connection_1.sequelize.authenticate();
            break;
        }
        catch (error) {
            retries--;
            console.error(error);
            await new Promise((res, rej) => setTimeout(res, 2000));
        }
    }
};
connectionTest();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(morgan_1.default("combined"));
app.use("/api/url", url_1.default);
app.listen(PORT, () => console.log(`Started Server on PORT: ${PORT}`));
