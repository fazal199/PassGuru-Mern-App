import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./db/db.js";

dotenv.config();

const isDbConnect = dbConnect();
isDbConnect.then((connections) => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server is running`);
        // console.dir(connections[0])
    })
})

isDbConnect.catch(error => {
    console.log(error);
})
