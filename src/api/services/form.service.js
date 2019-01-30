const FormSchema = require('../models/formSchema.model');

/**
 * Persists a new form.
 *
 * @param {*} body
 * @returns {Promise<FormSchema>}
 */
exports.createForm = body => {
    const form = new FormSchema(body);
    return form.save();
};

/**
 * Persists a new form or update it entirely if already exist.
 *
 * @param {*} body
 * @returns {Promise<FormSchema>}
 */
exports.createFormOrUpdate = body => {
    const { contextId, type } = body;
    return FormSchema
        .findOneAndUpdate({ contextId, type }, body, { upsert: true, new: true });
};

/**
 * Return a FormSchema object for contextId and type
 *
 * @param {string} contextId
 * @param {string} type
 * @returns {Promise<FormSchema>}
 */
exports.getForm = (contextId, type) => FormSchema.findOne({ contextId, type });
