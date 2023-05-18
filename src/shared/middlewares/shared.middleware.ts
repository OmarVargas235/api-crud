import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpResponse } from '@response/http.response';
import { ConfigServer } from '@config/config';
import { RoleType } from '@main/user/dto/user.dto';

interface Token extends jwt.JwtPayload {
    role: string;
}

export class SharedMiddleware extends ConfigServer {
    constructor(public httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction): void {
        const { role } = req;

        if (role !== RoleType.ADMIN) {
            this.httpResponse.Forbidden(res, 'No tienes permisos');
            return undefined;
        }

        next();
    }

    validateToken = (
        req: Request,
        resp: Response,
        next: NextFunction
    ): void => {
        const bearer = req.rawHeaders.find((v) => v.includes('Bearer'));
        const token = bearer?.split(' ').pop() ?? '';

        try {
            const tokenData = jwt.verify(
                token,
                this.getEnvironment('JWT_SECRET') ?? ''
            ) as Token;

            req.role = tokenData.role;

            next();
        } catch (err) {
            this.httpResponse.Unauthorized(resp, 'Sesión expirada');
        }
    };
}
