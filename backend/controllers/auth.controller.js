import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
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
const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
};

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
        await storeRefreshToken(user._id, refreshToken);
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

            const {accessToken,refreshToken}=genarateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);
            setCookies(res,accessToken,refreshToken);
            res.status(201).json({
                Id : user._id,
                name:user.name,
                email:user.email,
                role : user.role,
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

export const logout = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;

        //TODO:remove reddis
        if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}
    
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

//STEP... 10 : this will refresh the access token
export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addImage = async (req, res) => {
    const { image } = req.body;
    const userId = req.user.id; // Assuming req.user contains the authenticated user
    console.log( image , userId)
    try {

        // Upload image to Cloudinary
        let cloudinaryResponse = null;
        try {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "users",
                resource_type: "auto",
                width: 150,
                height: 150,
                crop: "fill",
                quality: "auto"
            });
        } catch (cloudinaryError) {
            console.error("Cloudinary upload error:", cloudinaryError);
            return res.status(400).json({ message: "Error uploading image" });
        }

        // Update user's image in database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: cloudinaryResponse.secure_url },
            { new: true, select: '-password' } // Return updated document and exclude password
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile image updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.image
            }
        });

    } catch (error) {
        console.error("Error in addImage controller:", error.message);
        res.status(500).json({ 
            message: "Server error while updating profile image",
            error: error.message 
        });
    }
};