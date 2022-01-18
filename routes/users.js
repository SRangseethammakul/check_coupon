const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const passportJWT = require('../middleware/passportJWT');

router.post('/register', [
  body('name').not().isEmpty().withMessage('please insert name'),
  body('userName').not().isEmpty().withMessage('please insert email'),
  body('password').not().isEmpty().withMessage('please insert password').isLength({min:8}).withMessage('password length 8')
], userController.register);
router.post('/login', userController.login);
router.get('/profile', [passportJWT.isLogin], userController.profile);

module.exports = router;
