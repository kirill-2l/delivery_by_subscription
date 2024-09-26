import { Response } from "express";

export const COOKIE_TOKEN_KEY = "cartToken" as const;
const COOKIE_EXPIRES_IN = new Date(new Date().setDate(new Date().getDate() + 60));
export const setCookie = (res: Response, token: string) => {
  res.cookie(COOKIE_TOKEN_KEY, token, { httpOnly: true, expires: COOKIE_EXPIRES_IN });
};

export const removeCookie = (res: Response) => res.clearCookie(COOKIE_TOKEN_KEY);
