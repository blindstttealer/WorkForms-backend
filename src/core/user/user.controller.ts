import express from "express";
import {
  getAllUsersService,
  getUserByIdService,
  loginUserService,
  logoutUserService,
  registerUserService,
} from "./user.service";
import { User } from "../../generated/client";

export const registerUser = (req: express.Request, res: express.Response) =>
  registerUserService(req, res);

export const getUserById = (req: express.Request, res: express.Response) =>
  getUserByIdService(req, res);

export const loginUser = (req: express.Request, res: express.Response) =>
  loginUserService(req, res);

export const getUsers = (req: express.Request, res: express.Response) =>
  getAllUsersService(req, res);

export const logoutUser = (req: express.Request, res: express.Response) =>
  logoutUserService(req, res);