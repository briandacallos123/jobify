import {Router} from 'express';
const router = Router();
import {body, validationResult} from 'express-validator'
import { validateTest, validateId } from '../middleware/validationMiddleware.js';
import {getJobs, getJob, updateJob, deleteJob, createJob} from '../controllers/jobController.js'

// router.route('/',).get(getJobs).post(createJob);
// router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)




router.route('/').post(validateTest, createJob).get(getJobs)
router.route('/:id').get(validateId, getJob)
router.route('/:id').patch(validateId, updateJob)
router.route('/:id').delete(validateId, deleteJob)





export default router;



















// router.post('/',[
//     body('name').notEmpty().withMessage("Name is required").isLength({min:15}).withMessage("Minimum length is 15"),
//     body("age").notEmpty().withMessage("Required")
// ],(req, res, next)=>{
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//      const errorMessage = errors.array().map((item)=>item.msg);
//      throw new Error(errorMessage)
//     }
//     next()
// },createJob)

// export default router;