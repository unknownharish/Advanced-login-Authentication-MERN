const express = require('express');
const {register,login,forgotPassword,resetPassword}  = require('../methods/routeMethods')
const router = express.Router();

// gemerate a route map 

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpasswrd').post(forgotPassword);
router.route('/resetPassword/:token').put(resetPassword);




module.exports = router;