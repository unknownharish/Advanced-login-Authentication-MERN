
const express = require('express');
const app = express();

//connect database 
const connect = require('./mongodb/connectdb');
//accessing enviroment variable 
require('dotenv').config();

// convert all request data into json format
app.use(express.json());

//custom routes
app.use('/user',require('./routes/routes'));
app.use('/login',require('./Auth/privateroute'));


// setting server 
app.listen(process.env.PORT, () => console.log('server started'))