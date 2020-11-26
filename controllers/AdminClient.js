const NorteModel = require('../models/norteModel');
const LoginModel = require('../models/LoginAdmin');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.SendForm = async (req, res) => {
    const { nameClient, cellNumber, message } = req.body

    const client = {
        nameClient,
        cellNumber,
        message
    };

    const newClient = new NorteModel(client);
    await newClient.save();
    res.send(newClient)

}

exports.GetMessage = async (req, res) => {

    const message = await NorteModel.find({})
    console.log('entra a la ruta getMessage')
    res.send(message)
}

exports.registeradmin = async (req, res) => {
    
    console.log('entra a la ruta')
    const {username, password } = req.body

    const admin = {
        username,
        token:[]
    };

    console.log('admin', admin)

    const salt = await bcryptjs.genSalt(10);
    admin.password = await bcryptjs.hash(password, salt);

    const usuario = new LoginModel(admin);

    console.log('usuario', usuario)

    try {
        await usuario.save();
        res.send({ mensaje: 'Tu Administrador se Registro Correctamente', admin })
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.LoginAdmin = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { body } = req

    const userLogin = await LoginModel.findOne({ username: body.username });
    if (!userLogin) {
        return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
    }

    const passCheck = await bcryptjs.compare(body.password, userLogin.password);
    if (!passCheck) {
        return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
    }

    const jwt_payload = {
        user: {
            id: userLogin.id,
            username: userLogin.username,
            role: userLogin.roleType
        }
    }

    try {
        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        userLogin.token = [ token ] 
        await LoginModel.update({ username: userLogin.username }, userLogin)
        res.send({ mensaje: 'Logueado Correctamente', token,  role: userLogin.roleType, id: userLogin._id })
    } catch (error) {
        console.log('error ->', error)
        return res.status(500).json({ mensaje: 'ERROR', error })
    }
}

exports.editMessage = async (req, res) => {
    console.log(req.body); 
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ mensaje: 'Mensaje no encontrado' });
        }

        const message = await NorteModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.send(message)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

}