const mongoose = require('mongoose');
const URL="mongodb+srv://samSingh:thamu5151H@cluster0.cvpmb2f.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=Cluster0";
const connectDB=async()=>{
    try{
        await mongoose.connect(URL);
        console.log("connection successful to DB");
    }
    catch(error){
        console.error("database connection failed");
        process.exit(0);
    }
}

module.exports = connectDB;
