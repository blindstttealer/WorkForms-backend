import express from "express";
import {getUserByIdService, loginUserService, registerUserService} from "./user.service";
import {User} from "../../generated/client";


export function registerUser(req: express.Request, res: express.Response) {
    const user = registerUserService(req, res)
}

export function getUserById(req: express.Request, res: express.Response) {
    const user = getUserByIdService(req, res)
}

export function loginUser(req: express.Request, res: express.Response) {
    const user = loginUserService(req, res)
}