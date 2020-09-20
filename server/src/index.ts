import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { createConnection, sequelize } from "./db/connection";
import urlRouter from "./api/url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

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
            createConnection();
            await sequelize.authenticate();
            break;
        } catch (error) {
            retries--;
            console.error(error);
            await new Promise((res, rej) => setTimeout(res, 2000));
        }
    }
};

connectionTest();

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/url", urlRouter);

app.listen(PORT, () => console.log(`Started Server on PORT: ${PORT}`));
