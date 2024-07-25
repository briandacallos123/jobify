import { nanoid } from 'nanoid';
import JobModel from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
// import { NotFoundError } from '../errors/customError.js';
import { NotFound } from '../errors/customErrors.js';

// let jobs = [
//     { id: nanoid(), company: 'apple', position: 'front-end' },
//     { id: nanoid(), company: 'google', position: 'back-end' },
//   ];
  
export const getJobs = async(req, res) => {
    // console.log(req)
    let jobs = await JobModel.find({createdBy:req.user.userId})
   

    res.status(StatusCodes.OK).json({jobs})
}

export const getJob = async(req, res)=> {
    const {id} = req.params;

    const job = await JobModel.findById(id)
    if(!job)throw new NotFound(`Cannot find data with an id of ${id}`)
    res.status(StatusCodes.OK).json({data:job})

}

export const updateJob = async(req, res) =>{
    const {id} = req.params;

    const result = await JobModel.findByIdAndUpdate(id, req.body,{
        new:true
    })

    if(!result){
        return res.status(StatusCodes.NOT_FOUND).json({error:"Not found"})
    }

   
        
    res.status(StatusCodes.OK).json({message:"Updated successfully", job:result})
}


export const deleteJob = async(req, res)=>{
    try {
        await JobModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Deleted successfully"})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const createJob =  async(req, res) =>{
   req.body.createdBy = req.user.userId

    await JobModel.create({...req.body})
    res.status(StatusCodes.OK).json({msg:"Created successfully"})
}