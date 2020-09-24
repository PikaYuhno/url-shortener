"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../../schemas");
const Url_1 = __importDefault(require("../../db/models/Url"));
const middlewares_1 = require("./middlewares");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const body = req.body;
    const { value, error } = schemas_1.schema.validate(body);
    if (error)
        return res.status(400).json({ error });
    let expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 15);
    let url = { ...value, expireDate };
    await Url_1.default.create(url);
    res.status(201).end();
});
//Middleware:
// + check if name exists
// + check wether it's expired or not
router.get("/:name", middlewares_1.checkExistence, middlewares_1.checkExpirationDate, async (req, res) => {
    let urlObject = req.urlObject;
    //res.status(200).json({ redirectUrl: urlObject.redirectUrl });
    res.redirect(urlObject.redirectUrl);
});
exports.default = router;
