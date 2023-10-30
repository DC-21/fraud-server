const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://codedr21:codedr21@cluster0.95jsvaa.mongodb.net/emma?retryWrites=true&w=majority';

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));
db.once('open',()=>{
    console.log("connected to mongodb");
});

module.exports = mongoose;