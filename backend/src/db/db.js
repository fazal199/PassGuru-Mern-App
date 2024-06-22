import { connect } from "mongoose";

const dbConnect  = async()=>{
     try {
      
       const {connections} = await connect(`${process.env.MONGO_URL}/${process.env.DATABASE_NAME}`)
       console.log("Database Connected");
       return connections;
       
     } catch (error) {
        console.log("error while connecting to the database path:(db/db.js)")
        console.log(error.message);

        //if the database connection is failed then stop the server!
        process.exit(1);
     }
}

export default dbConnect;