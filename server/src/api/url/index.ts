import express, { Request, Response } from "express";
import { schema } from "../../schemas";
import Url from "../../db/models/Url";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const body = req.body;

    const { value, error } = schema.validate(body);
    if (error) return res.status(400).json({ error });

    const found = await Url.findOne({ where: { name: value.name } });
    if (found)
        return res
            .status(400)
            .json({
                error: {
                    details: [{ message: "The name is already in use!" }],
                },
            });

    let expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 15);

    let url = { ...value, expireDate };
    await Url.create(url);

    res.status(201).end();
});

export default router;
