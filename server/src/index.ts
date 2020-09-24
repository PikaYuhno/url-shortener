import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { createConnection, sequelize } from "./db/connection";
import urlRouter from "./api/url";
import cors from "cors";
import { checkExistence, checkExpirationDate } from "./api/url/middlewares";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

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

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/url", urlRouter);

//Middleware:
// + check if name exists
// + check wether it's expired or not
app.get(
    "/:name",
    checkExistence,
    checkExpirationDate,
    async (req: Request, res: Response) => {
        let urlObject = req.urlObject!;
        console.log("Redirecting to:", urlObject.redirectUrl);
        res.redirect(urlObject.redirectUrl);
    }
);

app.listen(PORT, () => console.log(`Started Server on PORT: ${PORT}`));
