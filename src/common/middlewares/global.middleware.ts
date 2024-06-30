import { NextFunction, Request, Response } from "express";

export function MiddlewareGlobal(req: Request, res: Response, next: NextFunction) {
    console.log(`---> ${req.method} en ${req.url} | ${new Date()}`);
    next();
}