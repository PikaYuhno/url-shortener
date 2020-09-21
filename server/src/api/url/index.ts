import express, { Request, Response } from "express";
import { schema } from "../../schemas";
import Url from "../../db/models/Url";
const router = express.Router();

declare module "express-serve-static-core" {
    export interface Request {
        urlObject?: Url;
    }
}

router.post("/", async (req: Request, res: Response) => {
    const body = req.body;

    const { value, error } = schema.validate(body);

    if (error) return res.status(400).json({ error });

    let expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + 60);

    let url = { ...value, expireDate };
    const created = await Url.create(url);

    console.log("Created Val:", created);

    res.status(201).end();
});

const checkExistence = async (req: Request, res: Response, next: Function) => {
    let name = req.params.name;
    const found: Url | null = await Url.findOne({ where: { name } });

    if (found) {
        req.urlObject = found;
        return next();
    }
    res.status(404).end();
};

const checkExpirationDate = async (
    req: Request,
    res: Response,
    next: Function
) => {
    let expireDate = new Date(req.urlObject!.expireDate);
    let currentDate = new Date();
    if (currentDate < expireDate) next();
    else {
        await Url.destroy({ where: { id: req.urlObject!.id } });
        res.status(404).end();
    }
};

//Middleware:
// + check if name exists
// + check wether it's expired or not
router.get(
    "/:name",
    checkExistence,
    checkExpirationDate,
    async (req: Request, res: Response) => {
        let urlObject = req.urlObject!;
        res.status(200).json({ redirectUrl: urlObject.redirectUrl });
    }
);

export default router;
