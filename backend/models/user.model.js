import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type:"string",
            required:[true,"Name is required"]
        },
        email:{
            type:"string",
            required:[true,"Email is required"]
        },
        password:{
            type:"string",
            required:[true,"Password is required"]
        }
    },
    {
        timestamps:true,
    }
);

// IMPORTANT: Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next(); // If password is not modified, skip hashing

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

// IMPORTANT: Compare password method to compare user entered password with hashed password in database
userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user",userSchema)
export default User;