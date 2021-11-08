const privateData = (req,res,next)=>{
    res.status(200).json({'name':req.user.name,success:true});
    next();
}

module.exports = privateData;