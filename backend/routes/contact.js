import express from "express";
const router = express.Router();
import {contactUs, getAllContactUsData} from "../controllers/contact.js";
import auth from "../middlewares/auth.js";

router.post('/', contactUs);
router.get('/get-all-contactus-list', auth, getAllContactUsData);

export default router;