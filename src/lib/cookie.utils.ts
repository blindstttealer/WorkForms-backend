import express from "express";

export function setCookies(req: express.Request, res: express.Response, LongToken: string, ShortToken:string){
    res.cookie("long_token", LongToken, {maxAge: 86400000 * 31}); //31 день
    res.cookie("short_token", ShortToken, {maxAge: 900000}); //15 минут
}

export function clearCookies(req: express.Request, res: express.Response){
    res.clearCookie("token");
}

export function getCookies(req: express.Request, res: express.Response){
    return req.cookies?.["token"]
}