import express from "express";
import {getUserByIdService, loginUserService, registerUserService} from "./user.service";


export async function registerUser(req: express.Request, res: express.Response) {
    console.log("[registerUser] POST /register called");
    const result = await registerUserService(req, res);
    console.log("[registerUser] registerUserService completed");
    return result;
}

export async function getUserById(req: express.Request, res: express.Response) {
    return getUserByIdService(req, res);
}

export async function loginUser(req: express.Request, res: express.Response) {
    return loginUserService(req, res);
}