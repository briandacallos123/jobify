import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    lastName:{
        type:String,
        default:"last name"
    },
    location:{
        type:String,
        default:'My City'
    },
    role:{
        type:String,
        enum:[...USER_ROLE],
        default:USER_ROLE[0]
    },
    avatar:String,
    avatarPublicId:String
})

export default mongoose.model('User',userSchema)