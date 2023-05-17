import { type Request, type Response } from 'express';
import { HistoryService } from '../services/history.service';
import { HttpResponse } from '@response/http.response';
import { type Paginate } from '../interfaces';

export class HistoryController {
    private readonly historyService: HistoryService;
    private readonly httpResponse: HttpResponse;

    constructor() {
        this.historyService = new HistoryService();
        this.httpResponse = new HttpResponse();
    }

    public async createHistory(req: Request, resp: Response): Promise<void> {
        try {
            const isEmail = await this.historyService.findByEmail(
                req.body.email
            );

            if (isEmail != null) {
                this.httpResponse.BadRequest(
                    resp,
                    'Ya existe un usuario con ese correo'
                );
                return undefined;
            }

            await this.historyService.createHistory(req.body);
            this.httpResponse.Ok(resp, 'Usuario registrado con exito');
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    }

    public async getHistories(req: Request, resp: Response): Promise<unknown> {
        try {
            const query = req.query as unknown as Paginate;
            const page =
                query.page > 1 ? (query.page - 1) * query.rowsPerPage : 0;

            const arrParams = Object.values(req.body).length;

            if (arrParams > 1) {
                return this.httpResponse.BadRequest(
                    resp,
                    'Solo se puede filtrar por un parametro a la vez'
                );
            }

            try {
                const data = await this.historyService.getHistories(
                    {
                        ...query,
                        page
                    },
                    req.body
                );

                if (data == null)
                    return this.httpResponse.NotFound(
                        resp,
                        'No existe usuario'
                    );

                this.httpResponse.hiddenProperties(data);
                this.httpResponse.Ok(resp, data);
            } catch (err) {
                this.httpResponse.Error(resp, err);
            }
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    }
}
