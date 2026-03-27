import express from "express";
import z from "zod"
import {prisma} from "../../db";
import * as argon2 from "argon2";
import {getTokens} from "../../lib/jwt.utils";
import {setCookies} from "../../lib/cookie.utils";
import {User} from "../../generated/client";


export async function registerUserService(req: express.Request, res: express.Response) {
    console.log("[registerUserService] Endpoint reached. Body:", JSON.stringify(req.body ?? {}));

    const { email, password, login } = req.body ?? {};
    if(!email || !password || !login){
        console.warn("[registerUserService] Missing required fields — email, password, or login is absent");
        return res.status(401).json({error: "invalid data"});
    }

    const schema = z.object({
        email: z.email(),
        password: z.string().min(3),
        login: z.string().min(3)
    })
    const parseResult = schema.safeParse(req.body);

    if (parseResult.error) {
        console.warn("[registerUserService] Validation failed:", parseResult.error.format());
        return res.status(400).json({error: "bad data"})
    }

    console.log("[registerUserService] Validation passed. Calling prisma.user.create() with email:", email, "login:", login);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: await argon2.hash(req.body.password),
                login,
            }
        })
        console.log("[registerUserService] prisma.user.create() succeeded. New user id:", user?.id);

        if(user){
            const tokens = getTokens(req, res, {id: user.id})
            setCookies(req, res, tokens.longToken, tokens.shortToken);
        }

        console.log("[registerUserService] Returning 200 response for user id:", user?.id);
        return res.status(200).json({user})


    } catch (e: any) {
        console.error("[registerUserService] Error during prisma.user.create():", {
            message: e?.message,
            code: e?.code,
            meta: e?.meta,
            stack: e?.stack,
        });
        if (e.code === "P2002"){
            return res.status(400).json({message: "Unique fields error"})
        } else {
            return res.status(400).json({error: e.message})
        }
    }
}
export async function getUserByIdService(req: express.Request, res: express.Response) {
    const id = req.userId
    if(!id){
        return res.status(401).json({error: "invalid id"})
    }
    const user:User|null = await prisma.user.findUnique({where: {id: id}})
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json({
        id: user.id,
        email: user.email,
    })
}
export async function loginUserService(req: express.Request, res: express.Response) {
    const { login, password } = req.body ?? {};
    if(!login || !password){
        return res.status(401).json({error: "invalid data"})
    }
    let user;
    user = await prisma.user.findUnique({where: {email: login}})
    if (!user){
        user = await prisma.user.findUnique({where: {login: login}})
    }
    if(!user){
        return res.status(401).json({error: "invalid data or not user found"})
    }
    const compare = await argon2.verify(user.password, password);
    if(!compare){
        return res.status(401).json({error: "invalid password"})
    }

    const tokens = getTokens(req, res, {id: user.id})
    setCookies(req, res, tokens.longToken, tokens.shortToken);

    return res.status(200).json({id: user.id, email: user.email})

}