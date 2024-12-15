import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

const genarateTokens = (userId) =>{
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn : "15m",
    });

    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn : "7d",
    });

    return {accessToken,refreshToken};

}

const setCookies = (res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken",refreshToken,{
        httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

}


export const signup = async (req,res)=>{
    const {name,password,email} = req.body

    try {
        const existuser = await User.findOne({email})

        if(existuser){
            return res.status(400).json({message:"User already Exist"})
        }
        const user = await User.create({name,email,password})

        const { accessToken,refreshToken } = genarateTokens(user._id);

        setCookies(res,accessToken,refreshToken);

        res.status(201).json({
            id:user._id,
            name : user.name,
            email:user.email,
            password:user.password
        })
    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:error.message})
    }
}

export const login =async(req,res) =>{
    try {
        const { email , password } = req.body;
        const user = await User.findOne({email})

        if(user && (await user.comparePassword(password))){

            const {accessToken,refreshToken}=genarateTokens(user._id)
            setCookies(res,accessToken,refreshToken);
            res.status(201).json({
                Id : user._id,
                name:user.name,
                email:user.email,
            });
        }
        else{
            res.status(400).json({message : "invalid email or password"})
        }
    } catch (error) {
        console.log("Error in login controller",error.message)
        res.status(500).json({message:error.message});
    }
}

export const logout =(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;

        //TODO:remove reddis
    
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message : "Server error",error:error.message})
    }
}
export const getProfile = async (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};