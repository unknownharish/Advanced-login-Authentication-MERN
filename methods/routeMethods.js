
const bcrypt = require('bcryptjs');
const schema = require('../schema/mongoSchema');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../sendGridEmail/mail');
require('dotenv').config();


exports.register = async function (req, res, next) {


    //getting user details from request 

    let { username, email, password } = req.body;
    let user = new schema({ username, email, password });

    try {
        await user.save();

        //this generate a token when a valid user is found

        getToken(user, 200, res);

    } catch (error) {

        res.status(200).json({ 'error': 'error in saving user...', 'success': false });
        console.log(error)
    }

}

exports.login = async function (req, res, next) {

     //getting user details from request 

    let { email, password } = req.body;

    if (!email || !password) {
        
        res.status(200).json({ "error": 'something wemt wrong', 'success': false });
        next();

    }
    else {
   
        //check is there a valid user is exist

        let user = await schema.findOne({ email }).select('+password');
       
        if (!user) {
            res.status(200).json({ "error": 'no user found', 'success': false });

        }



        //if user exist then set the token in headers   
        if (await user.compare(password)) {

            let token = user.generateToken();
            req.headers.Authorization = token;
            res.status(200).json({ 'token': token, 'error': '', 'success': true });
            next();

        }
        else {
            res.status(200).json({ 'error': 'password not match', 'success': false })

        }


    }



}

exports.forgotPassword = async function (req, res, next) {

    //getting user details from request 

    let { email } = req.body;
    let user = await schema.findOne({ email });
    
    if (!user) {
        res.status(200).json({ 'error': 'user not found...!', 'success': false });
        next();
    }
    
    //generate the token and update the fields of user in database 
    
    let token = user.tokenReset();

    //after updating the fields then update the user

    await user.save();

    let reset_Url = `http://localhost:3000/resetPassword/${token}`
    

    const info = {
        to: email,
        from: 'laptopsharma1104@gmail.com',
        subject: 'reset your password',
        text: `<a href=${reset_Url}> click here</a>`,
    }

    // send the reset url to the email of the user 
    try {

        sendEmail(info);
    } catch (error) {

        user.resetToken = undefined;
        user.tokenExpire = undefined;
        await user.save();
        res.status(200).json({ 'error': 'email not send.', 'success': false });
        next();
    }

    res.status(200).json({ 'reset_Url': reset_Url, 'error': '', 'success': true });
    next();
}





const getToken = function (user, status, res) {

    //generate token 

    let payload = { _id: user._id }
    let token = jwt.sign(payload, process.env.JwtSecret);
    res.status(200).json({ 'error': '', "token": token, 'success': true });
   

}


exports.resetPassword = async function (req, res, next) {
    
    // get the raw token string from the reset url

    let token = req.params.token;
    
    let { password } = req.body;

    let resetToken = crypto.createHash('sha256').update(token).digest('hex');
   
    //then make a another hash with same raw salt 

    let user = await schema.findOne({ resetToken, tokenExpire: { $gt: Date.now() } }).select('+password');

    // check if the user contains newly created hash 

    console.log(user)
    if (!user) {
        res.status(200).json({ error: 'bad request ..token expire', 'success': false });
        next();
    }

    // if user is valid set the password with newly password
    user.password = password;
    user.tokenExpire = undefined;
    user.resetToken = undefined;

    try {
        await user.save();

    } catch (error) {
        
        res.status(200).json({ error: 'something went wrong', 'success': false })
    }

    res.status(200).json({ error: '', success: true })



}

