const error=(err,req,res,next)=>{
    console.log(err);
    res.status(500).json({msg:'sometthing went wrong'});
}

module.exports=error;