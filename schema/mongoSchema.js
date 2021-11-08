const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

require('dotenv').config();

//create a customized schema with custom fields 

const schema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please Enter "],
        minlength: 5,
    },
    email: {
        type: String,
        required: [true, "please enter valid email"],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "enter a valid email"
        ]
    },

    password: {
        type: String,
        required: [true, "please enter password"],
        select: false,
        minlength: 4,

    },

    resetToken: String,
    tokenExpire: Date,

});

// add a function to user Schema
//to hash the password before saving to database

schema.pre('save', async function (next) {

    if(!this.isModified('password')){
        next();
    }

      let salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password,salt);
      next();

}
)

//generate token which contains user id  

schema.methods.generateToken = function() {
    
    return (jwt.sign({id:this._id},process.env.JwtSecret))
};


// compare if the user entered password is equal to hashed saved password
schema.methods.compare = async function(password){
    let bool  = await bcrypt.compare(password,this.password);
    return bool;
}


//generate and return reset token that is added to the end of reset url link

schema.methods.tokenReset = function () {
    
    let token =  crypto.randomBytes(10).toString('hex');
    this.resetToken = crypto.createHash('sha256').update(token).digest('hex');
    
    this.tokenExpire = Date.now() + 10*(60*1000);
  
    return token;
}

//make a database with name of userDataBase
const model = mongoose.model('userDataBase', schema);


module.exports = model;