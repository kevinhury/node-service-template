const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/form.controller');
const { authorize } = require('../../middlewares/auth');
const {
    create,
} = require('../../validations/v1/form.validation');

const router = express.Router();

/**
 * @api {put} v1/form Create
 * @apiDescription Creates a new form for Context
 * @apiVersion 1.0.0
 * @apiName Create
 * @apiGroup Form
 * @apiPermission public
 *
 * @apiParam {String}   contextId Context Id
 * @apiParam {Object}   formSchema JSON Schema
 * @apiParam {Array}    order      UI order of the form
 * @apiParam {Object}   options    Additional form options
 *
 * @apiSuccess (Created 201) {String}  contextId               Context's id
 * @apiSuccess (Created 201) {String}  formSchema.title         JSON Schema title
 * @apiSuccess (Created 201) {String}  formSchema.description   JSON Schema description
 * @apiSuccess (Created 201) {String}  formSchema.type          JSON Schema type
 * @apiSuccess (Created 201) {Array}   formSchema.required      Array of required fields from JSON Schema
 * @apiSuccess (Created 201) {Object}  formSchema.properties    JSON Schema additional properties
 * @apiSuccess (Created 201) {Array}   order                    UI order of the form
 * @apiSuccess (Created 201) {Array}   options                  Additional form options
 *
 * @apiError   (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError   (Unauthorized 401) Unauthorized     Unauthorized
 */
router.route('/')
    .put(validate(create), controller.create);


/**
 * @api {get} v1/form/:contextId:/:type Get
 * @apiDescription Get form for contextId and type
 * @apiVersion 1.0.0
 * @apiName Get
 * @apiGroup Form
 * @apiPermission public
 *
 * @apiParam {String}   type Form type
 * @apiParam {String}   contextId Context Id
 *
 * @apiSuccess (Created 201) {String}  formSchema.title         JSON Schema title
 * @apiSuccess (Created 201) {String}  formSchema.description   JSON Schema description
 * @apiSuccess (Created 201) {String}  formSchema.type          JSON Schema type
 * @apiSuccess (Created 201) {Array}   formSchema.required      Array of required fields from JSON Schema
 * @apiSuccess (Created 201) {Object}  formSchema.properties    JSON Schema additional properties
 * @apiSuccess (Created 201) {Array}   order                    UI order of the form
 * @apiSuccess (Created 201) {Array}   options                  Additional form options
 *
 * @apiError   (Bad Request 400)    ValidationError     Some parameters may contain invalid values
 * @apiError   (Unauthorized 401)   Unauthorized        Unauthorized
 */
router.route('/:type/:contextId')
    .get(authorize(), controller.get);


module.exports = router;
