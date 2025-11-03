import express from "express";
import {AuthGuard} from "../../middleware/auth";
import {GuardTest, test} from "./user.controller";


const router = express.Router();

router.get("/", test)
router.get("/guard", AuthGuard, GuardTest)

export const userRouter = router