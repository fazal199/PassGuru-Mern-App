import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { createEntry, updateEntry,deleteEntry } from "../controllers/entries.controller.js";

const entriesRouter = Router();

entriesRouter.route("/create").post(auth, createEntry);
entriesRouter.route("/update").patch(auth, updateEntry);
entriesRouter.route("/delete/:_id").delete(auth,deleteEntry);
export default entriesRouter;