const mongoose = require('mongoose');

/**
 * Form Schema
 * @private
 */
const formSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    contextId: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    formSchema: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    order: {
        type: [String],
        default: [],
    },
    options: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
}, { timestamps: true });


/**
 * @typedef FormSchema
 */
const FormSchema = mongoose.model('FormSchema', formSchema);
module.exports = FormSchema;
