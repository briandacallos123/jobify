import { StatusCodes } from "http-status-codes";
import userSchema from "../models/userSchema.js"
import bcrypt from 'bcryptjs'
import { comparePassword, hashPass } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async(req, res) => {

    const hashedPass = await hashPass(req.body.password)
    req.body.password = hashedPass


    const user = await userSchema.create({...req.body});
    res.status(StatusCodes.CREATED).json({user})
}

export const login = async(req, res) => {
    const isExists = await userSchema.findOne({email:req.body.email});

    if(!isExists) throw new UnauthenticatedError("User doesnt exists");
    const matchedPass = await comparePassword(req.body.password, isExists.password);
    if(!matchedPass) throw new UnauthenticatedError("User doesnt exists");

    const token = createJWT({userId:isExists?._id, role:isExists?.role})
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly:true,
        expiresIn:new Date(Date.now() + oneDay),
        secure:process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({msg:"logged in"})

}


export const logout = (req, res) => {
    
    res.cookie('token','logout',{
        httpOnly:true,
        expiresIn:new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg:"Success logout"})
}