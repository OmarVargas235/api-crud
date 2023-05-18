import { type Request, type Response, type NextFunction } from 'express';
import { BaseRouter } from '@router/index';
import { HistoryController } from './controller/history.controller';
import { HistoryMiddleware } from './middleware/history.middleware';

export class HistoryRouter extends BaseRouter<
    HistoryController,
    HistoryMiddleware
> {
    constructor() {
        super(HistoryController, HistoryMiddleware);
    }

    routes(): void {
        this.router.post(
            '/createHistory',
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.checkAdminRole(req, resp, next);
            },
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.historyValidator(req, resp, next);
            },
            (req: Request, resp: Response) => {
                void this.controller.createHistory(req, resp);
            }
        );

        this.router.post(
            '/list_active_history',
            (req: Request, resp: Response, next: NextFunction) => {
                this.middleware.checkAdminRole(req, resp, next);
            },
            (req: Request, resp: Response) => {
                void this.controller.getHistories(req, resp);
            }
        );
    }
}
