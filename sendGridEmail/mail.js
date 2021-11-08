
require('dotenv').config();
const nodemailer = require('nodemailer');

//sending mail through nodemailer

const sendEmail = (options)=>{

    const transporter = nodemailer.createTransport({

        
    
        service:'SendGrid',
        
        
        auth:{
            
            user: 'apikey',
            pass:'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',
            
        }

    });

    const mailData = {
        from:'laptopsharma1104@gmail.com',
        to:options.to,
        subject:options.subject,
        html:options.text
    };

    transporter.sendMail(mailData,(err,info)=>{
        err?console.log(err):console.log(info)
    })


}
 
module.exports = sendEmail;