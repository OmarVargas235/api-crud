import { SharedMiddleware } from '@middlewares/shared.middleware';
import { BaseRouter } from '@router/index';
import { AuthController } from './controllers/auth.controller';

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
    constructor() {
        super(AuthController, SharedMiddleware);
    }

    routes(): void {
        this.router.post('/login', async (req, res) => {
            await this.controller.login(req, res);
        });
    }
}
