const express = require('express');
const { check } = require('express-validator')
const router = express.Router();


const sendForm = require('../controllers/AdminClient')

router.post('/register', [
    check('username', 'campo vacio user').notEmpty(),
    check('password', 'campo vacio pass').notEmpty()
], sendForm.registeradmin)

router.post('/login', [
    check('username', 'Campo Vacio').notEmpty(),
    check('password', 'Campo Vacio').notEmpty()
], sendForm.LoginAdmin)

router.post('/send', [
    check('nameClient', 'Campo Vacio. Nombre').notEmpty(),
    check('cellNumber', ' Campo Vacio. Numero de CEl').notEmpty(),
    check('message', 'Campo Vacio Mensaje').notEmpty()
], sendForm.SendForm)

router.get('/getmessage', sendForm.GetMessage)



module.exports = router