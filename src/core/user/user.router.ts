import express from "express";
import {AuthGuard} from "../../middleware/auth";
import {getUserById, loginUser, registerUser} from "./user.controller";


const router = express.Router();


router.post("/register", registerUser)
router.get("/get", AuthGuard, getUserById)
router.post("/login", loginUser)

export const userRouter = router