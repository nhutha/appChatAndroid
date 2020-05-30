require("dotenv").config();

import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

export {checkToken};


const checkToken = async(req,res,next)=>{
    try{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(400).send({
                message : "Chưa đăng nhập"
            })
        }
        const decode = await jwt.verify(authorization,process.env.JWT_KEY);
        
        if(userModel.findOne({_id:decode.id})){
            req.decode = decode;
            next();
        }else{
            return res.status(401).send({
                message : "Lỗi xác thực"
            });
        }
    }catch(e){
        next(e);
    }
}
