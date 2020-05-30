import {Schema,model} from "mongoose";

const messageSchema = new Schema({
    _id : Schema.Types.ObjectId,
    idUserSend: {
        type : Schema.Types.ObjectId,
        ref : "USER"
    },
    idUserReceive : {
        type : Schema.Types.ObjectId,
        ref : "USER"
    },
    message : [String]
});

const messageModel = new model("USER",messageSchema);

export default messageModel;