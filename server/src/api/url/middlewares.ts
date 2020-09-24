import { Request, Response } from "express";
import Url from "../../db/models/Url";

declare module "express-serve-static-core" {
    export interface Request {
        urlObject?: Url;
    }
}

export const checkExistence = async (
    req: Request,
    res: Response,
    next: Function
) => {
    let name = req.params.name;
    const found: Url | null = await Url.findOne({ where: { name } });

    if (found) {
        req.urlObject = found;
        return next();
    }
    res.status(404).end();
};

export const checkExpirationDate = async (
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
