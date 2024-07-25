import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import {body, param, validationResult} from 'express-validator'
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import userSchema from "../models/userSchema.js";
import jobModel from "../models/jobModel.js";

const validationError = (validationBody) => {
    return [validationBody, 
        (req, res, next)=>{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            const errorMsg = errors.array().map((item)=>item.msg);
            // return res.status(500).json({msg:errorMsg})
            throw new BadRequestError(errorMsg)
        }
        next()
    }]
}

export const validateTest = validationError([
    body('company').notEmpty().withMessage("Company is required"),
    body('position').notEmpty().withMessage('position is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid job status'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid job status'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
])


export const validateId = validationError([
    param('id').custom(async(val, {req})=>{
        const valid = mongoose.Types.ObjectId.isValid(val)
        if(!valid) throw new Error("Invalid id");
        const job = await jobModel.findById(val);
        if(!job)throw new Error("Data doesn't exists");
        const isOwner =  req.user.userId === job.createdBy.toString();
        if(!isOwner) throw new UnauthorizedError("Unauthorized person")
    })
])

export const validateRegister = validationError([
    body('name').notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email").custom(async(val)=>{
        const isExists = await userSchema.findOne({email:val});
        if(isExists){
            throw new BadRequestError("Email already used")
        }
        return true;
    }),
    body('password').notEmpty().withMessage("Password is required").isLength({min:10}).withMessage("password's length should be minimum of 10"),
    body("lastName").notEmpty().withMessage("Last name should not be empty"),
    body('location').notEmpty().withMessage("location must not be empty")
    

])