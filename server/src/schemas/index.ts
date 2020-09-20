import Joi from "@hapi/joi";

export const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .max(100)
        .min(1)
        .required(),
    redirectUrl: Joi.string()
        .uri()
        .required(),
});
