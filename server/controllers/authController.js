const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt  = require("jsonwebtoken")


// User Reguster 
const registerUser = async(req,res)=>{

    try {
        
        const {name, email, password} = req.body;

        //(register (sign-up)) first we can check if the user is exist or not 
        const userExists = await User.findOne({email});
        if (userExists){
            res.status(400).json({
                message : "user is already Exist"
            })
        }

        // Password hashing 
        const hashedPassword = await bcrypt.hash(password, 12)

        //  create a user 
        const userdata = await User.create({
            name,
            email,
            password : hashedPassword
        })


        //acknowledge and response 
        res.status(201).json({
            message : "User Registered Successfully",
            userdata
        })

    } catch (error) {
        
        res.status(500).json({ error: error.message });

    }

}

// User 
const loginUser = async(req,res)=>{

    try {
        // Get the Data from body(Destructuring)
        const {email, password} = req.body ;
        
        const user = await User.findOne({email})
        if(!user){
            res.json({
                message: "login successfull",
                token
              })
        }
        // password check 
        const passwordMatch = await bcrypt.compare(password, user.password)


        if(!passwordMatch){
            res.status(400).json({
                message: "Invalid credentials"
            })
        }

        //  Token assigning 
        const token = jwt.sign(
            {id : user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn : "30m"}

        );

        res.json({
            message : "login successfull",
            token
        })

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

}




module.exports = {
    registerUser,
    loginUser
}