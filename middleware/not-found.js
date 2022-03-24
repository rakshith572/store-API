const not_found=(req,res)=>{
    res.status(500).send('routes not found');
}
module.exports=not_found;