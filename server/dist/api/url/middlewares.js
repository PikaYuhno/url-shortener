"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpirationDate = exports.checkExistence = void 0;
const Url_1 = __importDefault(require("../../db/models/Url"));
exports.checkExistence = async (req, res, next) => {
    let name = req.params.name;
    const found = await Url_1.default.findOne({ where: { name } });
    if (found) {
        req.urlObject = found;
        return next();
    }
    res.status(404).end();
};
exports.checkExpirationDate = async (req, res, next) => {
    let expireDate = new Date(req.urlObject.expireDate);
    let currentDate = new Date();
    if (currentDate < expireDate)
        next();
    else {
        await Url_1.default.destroy({ where: { id: req.urlObject.id } });
        res.status(404).end();
    }
};
