import express from "express";
import {AuthGuard} from "../../middleware/auth";
import {getUserById, getUsers, loginUser, logoutUser, registerUser} from "./user.controller";


const router = express.Router();


router.post("/register", registerUser)
router.get("/me", AuthGuard, getUserById)
router.post("/login", loginUser)
router.get("/users", AuthGuard, getUsers);
router.delete("/logout", AuthGuard, logoutUser); 

export const userRouter = router