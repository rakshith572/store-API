require('dotenv').config();
const connect=require('./DB/connect');

const task=require('./models/product');

const jso=require('./product.json');

const start=async()=>{
    try{
        await connect(process.env.URI)
        await task.deleteMany()
        for(var i=0;i<jso.length;i++){
            await task.create(jso[i]);
        }
        // await task.create(j);
        console.log('populated!!!');
    }catch(error){
        console.log(error);
    }
}

start();