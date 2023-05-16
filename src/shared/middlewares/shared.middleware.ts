import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
// import { RoleType } from '@entities/user/dto/user.dto';
// import { type UserEntity } from '@entities/user/entities/user.entity';
import { HttpResponse } from '@response/http.response';
import { ConfigServer } from '@config/config';
import passport from 'passport';

type NameStrategies = 'auth-facebook' | 'auth-google';

const scopes: Array<{ scope: string; type: NameStrategies }> = [
    {
        scope: 'https://www.googleapis.com/auth/userinfo.profile',
        type: 'auth-google'
    },
    {
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        type: 'auth-google'
    }
];

export class SharedMiddleware extends ConfigServer {
    constructor(public httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passAuth(type: NameStrategies): any {
        const arr = scopes
            .filter((v) => v.type === type && v.scope)
            .map((v) => v.scope);

        return passport.authenticate(type, {
            scope: arr,
            session: false
        });
    }

    checkEncargadoRole(req: Request, res: Response, next: NextFunction): void {
        // const user = req.user as UserEntity;

        // if (user.role !== RoleType.ENCARGADO) {
        //     this.httpResponse.Unauthorized(res, 'No tienes permiso');
        //     return undefined;
        // }

        next();
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction): void {
        // const user = req.user as UserEntity;

        // if (user.role !== RoleType.ADMIN) {
        //     this.httpResponse.Unauthorized(res, 'No tienes permiso');
        //     return undefined;
        // }

        next();
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
