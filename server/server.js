const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const connectmongodb = require("./config/dbconnection")


dotenv.config();
connectmongodb();


// middleware 
app.use(cors());
app.use(express.json())



//now impoert the route 
const authRoutes = require("./routes/authRoutes");
//test for autthmiddleware
const testRoutes = require("./routes/testRoutes");
//courses routs
const courseRoutes = require("./routes/courseRoutes");
//Enrollment routs
const enrollmentRoutes = require("./routes/enrollmentRoutes");
// Payment Routes 
const paymentRoutes = require("./routes/paymentRoutes");



//use that routes , we are adding api in the path that it'll easy to connect with frontend 
app.use("/api/auth", authRoutes)
//test for auth middleware (first hit the login and then take the token and create a request for authmiddleware testing and put the token in the request with (eg. Bearer Token))
app.use("/api/test", testRoutes);
//use courses routes 
app.use("/api/courses", courseRoutes);
//use enrollment routes
app.use("/api/enrollments", enrollmentRoutes);
// use payment routes to the app
app.use("/api/payment", paymentRoutes);





// // testing route

// app.get("/", (req,res)=>{

//     res.send("server is running successfully")

// })

// port 
const PORT = process.env.PORT || 8080;


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
})