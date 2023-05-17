import { type Request, type Response, type NextFunction } from 'express';
import { BaseRouter } from '@router/index';
import { UserController } from './controller/user.controller';
import { UserMiddleware } from './middleware/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.post(
            '/createUserWithOutToken',
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.userValidator(req, resp, next);
            },
            (req: Request, resp: Response) => {
                void this.controller.createUser(req, resp);
            }
        );

        this.router.post(
            '/createUser',
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.validateToken(req, resp, next);
            },
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.userValidator(req, resp, next);
            },
            (req: Request, resp: Response) => {
                void this.controller.createUser(req, resp);
            }
        );

        this.router.post(
            '/admin_list_active_users',
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.validateToken(req, resp, next);
            },
            (req: Request, resp: Response) => {
                void this.controller.getUsers(req, resp);
            }
        );

        this.router.delete(
            '/delete_users/:id',
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.validateToken(req, resp, next);
            },
            (req: Request, resp: Response) => {
                void this.controller.deleteUser(req, resp);
            }
        );
    }
}
