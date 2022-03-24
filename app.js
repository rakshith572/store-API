require('dotenv').config();
require('express-async-errors');
const express=require('express');
const app=express();



const connectDB=require('./DB/connect');


const notFound=require('./middleware/not-found');
const errorHandler=require('./middleware/error-handler');
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send("heelo play boy");
})

const route=require('./Routes/products')
app.use('/api/v1/products',route);

app.use(notFound);
app.use(errorHandler);






const start =async()=>{
    try{
        await connectDB(process.env.URI);
        app.listen(5000,console.log("server listening at port 5000.........."));
    }catch(error){
        console.log({msg:error});
    }
}

start();