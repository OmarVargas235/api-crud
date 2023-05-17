import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpResponse } from '@response/http.response';
import { ConfigServer } from '@config/config';

export class SharedMiddleware extends ConfigServer {
    constructor(public httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    validateToken(req: Request, resp: Response, next: NextFunction): void {
        const bearer = req.rawHeaders.find((v) => v.includes('Bearer'));
        const token = bearer?.split(' ').pop() ?? '';

        try {
            jwt.verify(token, this.getEnvironment('JWT_SECRET') ?? '');
            next();
        } catch (err) {
            this.httpResponse.Unauthorized(resp, 'Sesión expirada');
        }
    }
}
