import express from "express";
import z from "zod"
import {prisma} from "../../db";
import * as argon2 from "argon2";
import {getTokens} from "../../lib/jwt.utils";
import {clearCookies, setCookies} from "../../lib/cookie.utils";
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
        login: user.login
    })
}
export async function loginUserService(req: express.Request, res: express.Response) {
    const { login, password } = req.body ?? {};

    console.log('login-', login)
    console.log("password-", password);

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

    return res.status(200).json({id: user.id, email: user.email, login: user.login})

}

export async function getAllUsersService(
  req: express.Request,
  res: express.Response
) {
  const currentUserId = req.userId;

  if (!currentUserId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const users = await prisma.user.findMany({
    where: {
      id: { not: currentUserId }, 
    },
    select: {
      id: true,
      login: true,
      email: true,
    },
  });

  return res.status(200).json(users);
}

export async function logoutUserService(
  req: express.Request,
  res: express.Response
) {
  try {
    clearCookies(req, res);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during logout" });
  }
}