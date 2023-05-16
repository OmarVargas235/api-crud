import { type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../services/user.service';
import { HttpResponse } from '@response/http.response';

export class UserController {
    private readonly userService: UserService;
    private readonly httpResponse: HttpResponse;

    constructor() {
        this.userService = new UserService();
        this.httpResponse = new HttpResponse();
    }

    public async getUserById(req: Request, resp: Response): Promise<unknown> {
        const { id } = req.params;

        try {
            const data = await this.userService.findUserById(id);

            if (data == null)
                return this.httpResponse.NotFound(resp, 'No existe usuario');

            this.httpResponse.Ok(resp, data);
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
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

            req.body.provider = '';
            req.body.provider_id = uuidv4();

            await this.userService.createUser(req.body);
            this.httpResponse.Ok(resp, 'Usuario registrado con exito');
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    }
}
