
//connect with Database 

require('dotenv').config();
const momgoose = require('mongoose');
const connect =momgoose.connect(process.env.url,(e)=>e?console.log(e):console.log('Mongo connected'));

module.exports = connect;