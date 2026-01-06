import express from "express";

export function setCookies(req: express.Request, res: express.Response, LongToken: string, ShortToken:string){
    res.cookie("long_token", LongToken, {
      maxAge: 31 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }); 
    res.cookie("short_token", ShortToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    }); 
}

export function clearCookies(req: express.Request, res: express.Response) {
  res.clearCookie("long_token");
  res.clearCookie("short_token");
}

export function getCookies(req: express.Request) {
  return {
    longToken: req.cookies?.["long_token"],
    shortToken: req.cookies?.["short_token"],
  };
}