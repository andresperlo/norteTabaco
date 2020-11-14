const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err)=>{
    if(err){
        console.log('hay error en mongo ->', err)
    }else{
        console.log('Anda Joia Mongo->')
    }
});