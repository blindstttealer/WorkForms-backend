import express from "express";
import {AuthGuard} from "../../middleware/auth";
import {getUserById, registerUser} from "./user.controller";


const router = express.Router();


router.post("/register", registerUser)
router.get("/get", AuthGuard, getUserById)

export const userRouter = router