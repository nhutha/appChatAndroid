
require("dotenv").config();

import mongoose from "mongoose";

const dbUrl = process.env.drCloud ;
const options = {
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

const connect = ()=>{
    mongoose.connect(dbUrl,options,()=>{
        console.log("Database connect success");
    });
}

export default connect;
