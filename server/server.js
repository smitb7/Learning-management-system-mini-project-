const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const connectmongodb = require("./config/dbconnection")


dotenv.config()
connectmongodb();


// middleware 
app.use(cors());
app.use(express.json())


// testing route

app.get("/", (req,res)=>{

    res.send("server is running successfully")

})

// port 
const PORT = process.env.PORT || 8080;


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
})