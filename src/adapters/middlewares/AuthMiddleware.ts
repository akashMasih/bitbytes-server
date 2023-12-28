// src/adapters/middlewares/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = token
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
