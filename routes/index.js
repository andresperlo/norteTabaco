const express = require('express');
const router = express.Router();

const sendForm = require('./form')

router.use('/', sendForm)

module.exports = router;
