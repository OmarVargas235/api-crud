import { type Request, type Response, type NextFunction } from 'express';
import { BaseRouter } from '@router/index';
import { UserController } from './controller/user.controller';
import { UserMiddleware } from './middleware/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.get('/user/:id', (req: Request, resp: Response) => {
            void this.controller.getUserById(req, resp);
        });
        this.router.post(
            '/createUser',
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.userValidator(req, resp, next);
            },
            (req: Request, resp: Response) => {
                void this.controller.createUser(req, resp);
            }
        );
    }
}
