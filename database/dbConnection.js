const mongoose= require("mongoose")
const connectionString=process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log('mongo connection sucessful');
}).catch(err=>{
    console.log('connection failed');
   console.log(err);
    
})