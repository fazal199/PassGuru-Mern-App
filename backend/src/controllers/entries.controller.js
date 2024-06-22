import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createEntry = asyncHandler(async (req, res) => {

    let { siteName, userName, password, } = req.body;

    //if the data is not provided
    if (!siteName || !userName || !password)
        throw new ApiError(400, 'Please provide all fields');

    
    //creating new record
    let newEntry = {
        appName: siteName,
        appUserName: userName,
        appUserPassword: password,
    }

    //adding new record 
    let updatedUserData = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { userEntries: newEntry } },
        { new: true }
    )

    //sending response with the updated data
    res.json(new ApiResponse(200, "New Entry Added", updatedUserData));
})

const updateEntry = asyncHandler(async (req, res) => {
    let { siteName, userName, password, _id } = req.body;
    //_id represents the record of userEntries which the user wants to update!

    //if the data is not provided
    if (!siteName || !userName || !password)
        throw new ApiError(400, 'Please provide all fields');


    //update the record new record
    let newEntry = {
        appName: siteName,
        appUserName: userName,
        appUserPassword: password,
    }

    //adding new record 
    let updatedUserData = await User.updateOne(
        // Filter to find the document with the specific id
        { "_id": req.user._id, "userEntries._id": _id },

        // Update operation using the positional $ operator and array filters
        { $set: { "userEntries.$[elem]": newEntry } },

        // Array filters to specify which element to update
        { arrayFilters: [{ "elem._id": _id }] }

    )

    //sending response with the updated data
    res.json(new ApiResponse(200, "New Entry Updated", updatedUserData));
})

const deleteEntry = asyncHandler(async (req, res) => {
    let { _id } = req.params;

    //if the id is not provided
    if (!_id)
        throw new ApiError(400, 'Please provide the Id!');

    //if the Entry doesn't exist
    let isEntryExist = await User.findOne({ $and: [{ "_id": req.user._id }, { "userEntries._id": _id }] });

    if (!isEntryExist)
        throw new ApiError(400, 'The Record doesn\'t exist!');


    //adding new record 
    let updatedUserData = await User.updateOne(
        // Filter to find the document with the specific id
        { "_id": req.user._id },
        { $pull: { userEntries: { "_id": _id } } }

    )

    //sending response with the updated data
    res.json(new ApiResponse(200, "The Entry deleted!", updatedUserData));
})

export {
    createEntry,
    updateEntry,
    deleteEntry
}