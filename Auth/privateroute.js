

const express = require('express');
const router = express.Router();
const {protect} = require('./protect');
const privatedata = require('./privatedata')

//add a protect function to protect it from unauthorized access
router.route('/private').post(protect,privatedata);

module.exports = router;