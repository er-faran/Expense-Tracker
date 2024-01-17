import express from "express";
const router = express.Router();
import {getAllUser, addUser} from "../controllers/user.js";
import auth from '../middlewares/auth.js';

router.get('/all-users', auth, getAllUser);
router.post('/add-user',auth, addUser);

export default router;