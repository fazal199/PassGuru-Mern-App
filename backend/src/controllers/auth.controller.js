import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from '../utils/apiResponse.js'
import ApiError from '../utils/apiError.js'

const signUpUser = asyncHandler(async (req, res) => {

   const { userName, userEmail, userPassword } = req.body;


   //check if user doesn't send the required info.
   if (!userName || !userEmail || !userPassword)
      throw new ApiError(400, "plzz provide full information!");


   // check if user exists already
   const isUserAlreadyExist = await User.findOne({ email: userEmail });
   if (isUserAlreadyExist)
      throw new ApiError(409, "User Already exist!");



   //create a new user and save
   let newUser = await User.create({
      username: userName,
      email: userEmail,
      password: userPassword,
      userEntries: [],
   });

   console.log(newUser);

   //removing some sensitive fields like password etc
   newUser = await User.findOne({ _id: newUser._id }, { password: 0, refreshToken: 0 })

   //generating access and refresh tokens
   const { accessToken, refreshToken } = newUser.getAccessAndRefreshToken();

   //updating the refreshtoken in the database
   await User.findByIdAndUpdate(newUser._id, {
      refreshToken: refreshToken,
   })

   //creating the response
   const response = new ApiResponse(200, "User created", { accessToken, refreshToken });

   res.json(response)
})

const signInUser = asyncHandler(async (req, res) => {

   const { fromGoogle } = req.query;
   

   const { userEmail, userPassword } = req.body;

   if (!fromGoogle) {
      if (!userEmail || !userPassword)
         throw new ApiError(400, "Plzz Provide Email and Password both!");
   }

   let oldUser = await User.findOne({ email: userEmail });

   //if user doesn't exist
   if (!oldUser)
      throw new ApiError(401, "User doesn't exist");

   //if the password which is sent by user is wrong
   if (!fromGoogle) {
      if (!(oldUser.isPasswordCorrect(userPassword)))
         throw new ApiError(401, "Wrong Password!");
   }

   //removing some sensitive fields like password etc
   oldUser = await User.findOne({ _id: oldUser._id }, { password: 0, refreshToken: 0 })

   //generating access and refresh tokens
   const { accessToken, refreshToken } = oldUser.getAccessAndRefreshToken();

   //updating the refreshtoken in the database
   await User.findByIdAndUpdate(oldUser._id, {
      refreshToken: refreshToken,
   })

   //creating the response
   const response = new ApiResponse(200, "User Logged In!", { accessToken, refreshToken });

   res.json(response)
})

const getUserData = asyncHandler(async (req, res) => {
   let userData = req.user;
   res.json(new ApiResponse(200, "User data has been sent!", userData))
})

const logoutUser = asyncHandler(async (req, res) => {

   let userData = req.user;
   const updateUser = await User.findByIdAndUpdate(userData._id, { refreshToken: "" }, { new: true });
   console.log(updateUser);
   res.json(new ApiResponse(200, "User Logged out", {
      success: true,
   }))
})

export {
   signUpUser,
   signInUser,
   getUserData,
   logoutUser
}