import { StatusCodes } from "http-status-codes";
import User from "../models/userSchema.js";
import Job from "../models/jobModel.js";

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json({ user });
  };

  export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });
  };

  export const updateUser = async (req, res) => {
    console.log(req.file,'FILE')

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
    res.status(StatusCodes.OK).json({ msg: 'user updated' });
  };