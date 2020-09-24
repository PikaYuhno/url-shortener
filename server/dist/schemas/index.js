"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.schema = joi_1.default.object({
    name: joi_1.default.string()
        .alphanum()
        .max(100)
        .min(1)
        .required(),
    redirectUrl: joi_1.default.string()
        .uri()
        .required(),
});
