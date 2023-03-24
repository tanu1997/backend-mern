const express = require('express')
const router= express.Router()

const UserController= require('../controllers/UserController')


router.post('/store',UserController.store)
router.post('/update',UserController.update)
router.post('/forget-pswd',UserController.forget_password)

module.exports= router