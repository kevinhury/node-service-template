const Joi = require('joi');

module.exports = {
    // POST /v1/form
    create: {
        body: {
            contextId: Joi.string().required(),
            type: Joi.string().required(),
            formSchema: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                type: Joi.string().required(),
                required: Joi.array().required(),
                properties: Joi.object().required(),
            }).required(),
            order: Joi.array().required(),
            options: Joi.object(),
        },
    },
};
