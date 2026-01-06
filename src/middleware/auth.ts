import express from "express";
import {verifyJwtToken} from "../lib/jwt.utils";
import {setCookies} from "../lib/cookie.utils";
import {JwtPayload} from "jsonwebtoken";


export function AuthGuard(req: express.Request, res: express.Response, next: express.NextFunction){
    const short_token = req.cookies["short_token"];
    const long_token = req.cookies["long_token"];
    if (!short_token && !long_token){
        return res.status(401).send("No tokens provided");
    }

    try {
        const decoded = verifyJwtToken(short_token) as JwtPayload & { id: string };
        req.userId = decoded.id;
        return next()
    } catch (e){
        try {
            const decoded = verifyJwtToken(long_token) as JwtPayload & { id: string };
            req.userId = decoded.id;
            setCookies(req, res, long_token, !short_token ? long_token : short_token);
            return next()
        } catch (e){
            return res.status(401).send({status: 401, message: "bad tokens", redirect: false});
        }
    }
}