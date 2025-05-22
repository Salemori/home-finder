const {signUpService } = require("../services/authService");


const handleSignUp = async (req, res) =>{
   try {
        const {email, password} = req.body;

        const result = signUpService(email, password);
        
        res.status(201).json({
            data: result,
            message: "User registered successfully"
        });

   } catch (error) {
          res.json({
            status: "failed",
            message: error.message
        });
   }
}



module.exports = {handleSignUp }