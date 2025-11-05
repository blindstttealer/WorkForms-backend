import express from "express";
import z from "zod"
import {prisma} from "../../db";
import * as argon2 from "argon2";
import {getTokens} from "../../lib/jwt.utils";
import {setCookies} from "../../lib/cookie.utils";
import {User} from "../../generated/client";


export async function registerUserService(req: express.Request, res: express.Response) {
    const { email, password, login } = req.body ?? {};
    if(!email || !password || !login){
        return res.status(401).json({error: "invalid data"});
    }

    const schema = z.object({
        email: z.email(),
        password: z.string().min(3),
        login: z.string().min(3)
    })

    const parseResult = schema.safeParse(req.body);

    if (parseResult.error) {
        return res.status(400).json({error: "bad data"})
    }

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: await argon2.hash(req.body.password),
                login,
            }
        })
        if(user){
            const tokens = getTokens(req, res, {id: user.id})
            setCookies(req, res, tokens.longToken, tokens.shortToken);
        }


        return res.status(200).json({user})


    } catch (e: any) {
        if (e.code === "P2002"){
            return res.status(400).json({message: "Unique fields error"})
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