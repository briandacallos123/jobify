import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import morgan from 'morgan'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/authMiddleware.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// routes
import jobRouter from './routes/jobRoute.js';
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import { StatusCodes } from 'http-status-codes';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()
app.use(cookieParser())

app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"))
}
app.use(express.static(path.resolve(__dirname, './public')));

const PORT = process.env.PORT || 4000

app.use('/api/v1/jobs',authMiddleware, jobRouter)
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/user',authMiddleware, userRoute)

app.get("*", (req, res) =>{
    res.sendFile(path.resolve(__dirname,'./public','index.html'));
})

app.use("*",(req, res)=>{
    res.status(400).json({msg:"url not found"})
})



app.use((err, req, res,next)=>{
    const statusCode = err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || "Something went wrong";
    
    res.status(statusCode).json({msg})

//     console.log(err,' middleware error')
//    res.status(500).json({msg:err.message})
// //    next()
})


try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () =>{
        console.log(`listening on port ${PORT}`);
    })
    
} catch (error) {
    console.log(error);
    process.exit(1);
}