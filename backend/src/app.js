import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173", // 
    methods: "GET,PATCH,DELETE,POST",
    credentials: true,
}

app.use(cors(corsOptions));

// security practices//

//limit the size of json
app.use(express.json({ limit: "20kb" }))

//to decode the url (sometimes spaces treated as %20 or +)
app.use(express.urlencoded({ extended: true }))

//to manage static files
app.use(express.static("./public"))

//parse cookies (only server can read and delete the cookies)
app.use(cookieParser())


//routes imports
import authRouter from "./routes/auth.route.js";
import entriesRouter from "./routes/entries.route.js";


app.get("/",(req,res) => res.send("Welcome to PassGuru Server"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/entries", entriesRouter);

export default app;