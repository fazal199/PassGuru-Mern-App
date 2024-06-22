import jwt from 'jsonwebtoken';
import ApiResponse from '../utils/apiResponse.js';
import User from '../models/user.model.js';

const auth = async (req, res, next) => {

    let token = req.headers.authorization;

    //if token is provided
    if (!token)
        res.json(new ApiResponse(400, "Token not proivded!"))

    token = token.replace("Bearer", "").trim();

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            //if the user token is expired
            if (err) {
                res.json(new ApiResponse(500, "you have to login again!", err));
            }

            //taking user data
            let userData = decoded;
            userData = await User.findOne({ email: userData?.email }, { email: 1, username: 1, userEntries: 1 });
            req.user = userData;
            next();

        });
    } catch (error) {
        res.json(new ApiResponse(500, "you have to login again!", error));
    }

};

export default auth;
