import jwt from "jsonwebtoken";
import {hash} from "argon2";
import {JWT_SECRET} from "./config";

export function signShortJwt(payload: {id: string}){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "15m"});
}
export function signLongJwt(payload: {id: string}){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "31d"});
}

export function verifyJwtToken(token: string){
    return jwt.verify(token, JWT_SECRET);
}