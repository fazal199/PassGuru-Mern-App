import { Router } from "express";
import { signUpUser,signInUser,getUserData,logoutUser } from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route("/signup").post(signUpUser);
authRouter.route("/signin").post(signInUser);
authRouter.route("/user").get(auth,getUserData)
authRouter.route("/logout").get(auth,logoutUser)

export default authRouter;