import { type Request, type Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpResponse } from '@response/http.response';
import { type Paginate } from '../interfaces';

export class UserController {
    private readonly userService: UserService;
    private readonly httpResponse: HttpResponse;

    constructor() {
        this.userService = new UserService();
        this.httpResponse = new HttpResponse();
    }

    public async createUser(req: Request, resp: Response): Promise<void> {
        try {
            const isEmail = await this.userService.findByEmail(req.body.email);

            if (isEmail != null) {
                this.httpResponse.BadRequest(
                    resp,
                    'Ya existe un usuario con ese correo'
                );
                return undefined;
            }

            await this.userService.createUser(req.body);
            this.httpResponse.Ok(resp, 'Usuario registrado con exito');
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    }

    public async edituser(req: Request, resp: Response): Promise<void> {
        const id = req.query.id as string;

        try {
            const isEmail = await this.userService.findByEmail(req.body.email);

            if (isEmail != null) {
                this.httpResponse.BadRequest(
                    resp,
                    'No existe un usuario con ese correo'
                );
                return undefined;
            }

            await this.userService.edituser(id, req.body);
            this.httpResponse.Ok(resp, 'Usuario editado con exito');
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    }

    public async getUsers(req: Request, resp: Response): Promise<unknown> {
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
                const data = await this.userService.getUsers(
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

    public async deleteUser(req: Request, resp: Response): Promise<void> {
        try {
            const id = req.query.id as string;
            const isUser = await this.userService.findById(id);

            if (isUser == null) {
                this.httpResponse.BadRequest(resp, 'No existe este usuario');
                return undefined;
            }

            await this.userService.deleteUser(id);
            this.httpResponse.Ok(resp, 'Usuario eliminado con exito');
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    }
}
