
const jwt = require('jsonwebtoken');
const schema = require('../schema/mongoSchema');
require('dotenv').config();

exports.protect = async (req, res, next) => {

    // check if the header contains the Authorization header
    const token = req.headers.Authorization;
    if (!token) {
        res.status.json({ error: 'invalid header details','success':false })
    }

    try {


        //check if the header contains a valid information 

        let info = jwt.verify(token, process.env.JwtSecret);
        
        let user = await schema.findById({ _id: info._id });


        if (!user) {

            res.status.json({ error: 'invalid details',success:false })
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log('error');
    }






}