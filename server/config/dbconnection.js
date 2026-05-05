const mongoose = require("mongoose")

const connectmongodb = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully...!");
        
    } catch (error) {

        console.log("something wrong in Database connection");
        process.exit(1);        
        
    }

}

module.exports = connectmongodb