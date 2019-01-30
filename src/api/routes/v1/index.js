const express = require('express');
const formRoutes = require('./form.route');

const router = express.Router();


/**
 * GET v1/health
 */
router.get('/form/health', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/form', formRoutes);

module.exports = router;
