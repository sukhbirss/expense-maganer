const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();


router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.use(authController.protect);
router.patch('/updateme',userController.updateMe);
router.get('/me',userController.getme);
router.post('/addCategory',userController.addCategory);

module.exports = router;