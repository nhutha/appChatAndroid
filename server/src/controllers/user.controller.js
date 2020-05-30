require("dotenv").config();

import jwt from "jsonwebtoken";
import userModel from "../models/user.model";   
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export {login, register,getListUser};

const getListUser = async(req,res,next)=>{
    try{
        const {id} = req.decode;
        const listUser = await userModel.find();
        let index = -1;
        for(let i=0;i<listUser.length;i++){
            if(listUser[i]._id == id){
                index = i;
                break;
            }
        }
        listUser.splice(index,1);
        res.status(200).send({
            listUser
        })
    }catch(e){
        next(e);
    }
}

const login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const userFound = await userModel.findOne({email});
        if(userFound){
            if(!bcrypt.compareSync(password,userFound.password)){
                let message = `Lỗi xác thực`;
                let error = new Error(message);
                error.status = 401;
                throw error;
            }
            const body = {
                id:userFound._id,
                email : userFound.email
            };
            const token = await jwt.sign(body,process.env.JWT_KEY,{expiresIn : process.env.expiresIn});
            
            res.status(200).send({
                message : "Login success",
                token : token
            });
        }else{
            let message = `Lỗi xác thực`;
            let error = new Error(message);
            error.status = 401;
            throw error;
        }
    }catch(e){
        next(e);
    }
}


const register = async(req,res,next)=>{
    try{
        const {email,password,fullName} = req.body;

        const userFound = await userModel.findOne({email});
        if(userFound){
            let error =  new Error();
            error.message = "Lỗi xác thực";
            error.status = 401;
            throw error;
        }

        const hash = await bcrypt.hash(password + "",+process.env.SALT);

        const newUser = new userModel({
            _id : new mongoose.Types.ObjectId(),
            email,
            password : hash,
            fullName
        });
        
        await newUser.save();
        res.status(200).send({
            message : "register thành công",
            result : newUser
        })

    }catch(e){
        next(e);
    }
}