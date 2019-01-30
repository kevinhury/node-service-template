const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const formService = require('../services/form.service');
const logger = require('../../config/logger');
const { ROLE_ADMIN } = require('../../constants/roles');

const transformForm = form => {
    const {
        formSchema, type, order, contextId, options,
    } = form;

    return {
        formSchema, type, order, contextId, options,
    };
};


const validateOrderInSchema = ({ properties }, order) => {
    const propKeys = Object.keys(properties);
    if (propKeys.length !== order.length) {
        throw new Error('Properties and order list differ in size');
    }

    propKeys.forEach(prop => {
        if (order.indexOf(prop) === -1) {
            throw new Error(`Missing prop ${prop} in order list`);
        }
    });
};


/**
 * Creates new form
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        const {
            formSchema, order,
        } = req.body;
        validateOrderInSchema(formSchema, order);

        const formToCreate = transformForm(req.body);

        logger.log('info', `Creating/Updating form to structure: ${JSON.stringify(formToCreate)}`);
        const form = await formService.createFormOrUpdate(formToCreate);

        return res.json(transformForm(form));
    } catch (error) {
        return next(new APIError({
            message: error.message,
            status: httpStatus.BAD_REQUEST,
            isPublic: true,
        }));
    }
};

/**
 * Get form by contextId
 * @public
 */
exports.get = async (req, res, next) => {
    try {
        const { contextId, type } = req.params;
        const { role } = req.user;
        if (role !== ROLE_ADMIN) {
            const { contextId: userContext } = req.user;

            logger.log('info', `User at context ${userContext} requesting form: ${type}@${contextId}`);
            if (contextId !== userContext) {
                return next(new APIError({
                    message: 'User does not have access to this contextId',
                    status: httpStatus.FORBIDDEN,
                    isPublic: true,
                }));
            }
        }

        const form = await formService.getForm(contextId, type);
        if (!form) {
            return next(new APIError({
                message: 'FormSchema for this contextId does not exist',
                status: httpStatus.NOT_FOUND,
                isPublic: true,
            }));
        }

        const transformed = transformForm(form);
        logger.log('info', `Form ${type}@${contextId} found: ${JSON.stringify(transformed)}`);

        return res.json(transformed);
    } catch (error) {
        return next(new APIError({
            message: error.message,
            status: httpStatus.BAD_REQUEST,
            isPublic: true,
        }));
    }
};
