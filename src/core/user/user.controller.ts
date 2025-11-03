import express from "express";
import {signLongJwt, signShortJwt} from "../../lib/jwt.utils";
import {setCookies} from "../../lib/cookie.utils";

export async function test(req: express.Request, res: express.Response) {
    const ShortJwt = signShortJwt({id: "123"})
    const LongJwt = signLongJwt({id: "123"})
    setCookies(req, res, LongJwt, ShortJwt)
    return res.send("OK")
}

export function GuardTest(req: express.Request, res: express.Response) {
    return res.send("u are logging in")
}