import { hash, compare } from "bcrypt";
import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            require: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
            trim: true,
        },
        userEntries: [
            {
                appName: {
                    type: String,
                    trim: true,
                    unique: true,
                },
                appUserName: {
                    type: String,
                    trim: true,
                },
                appUserPassword: {
                    type: String,
                    trim: true,
                },
            }
        ],
        refreshToken: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {

    if (this.isModified("password"))
        this.password = await hash(this.password, 10);
})

userSchema.methods.getAccessAndRefreshToken = function () {
    try {

        const accessToken = jwt.sign({
            id: this._id,
            username: this.username,
            email: this.email,

        }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })

        const refreshToken = jwt.sign({
            id: this._id,

        }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })

        return { accessToken, refreshToken };

    } catch (error) {
        console.log("error while generating access and refresh tokens!")
        console.log(error)
    }
}

userSchema.methods.isPasswordCorrect = async function (userPassword) {
    return await compare(userPassword, this.password);
}

const User = new model("User", userSchema);

export default User;