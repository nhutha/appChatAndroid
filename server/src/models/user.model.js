import {Schema,model} from "mongoose";

const userSchema = new Schema({
    _id : Schema.Types.ObjectId,
    email : {
        type : String,
        match : /\w+@([a-z]+\.[a-z]+)((.[a-z])*)/,
        required : true,
        unique : true
    },
    fullName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const userModel = new model("USER",userSchema);

export default userModel;