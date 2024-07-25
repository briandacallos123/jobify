import express from "express";
import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
const router = express.Router();
import upload from "../middleware/multerMiddleware.js";

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', getApplicationStats);
router.patch('/update-user',upload.single('avatar'),  updateUser);


export default router;