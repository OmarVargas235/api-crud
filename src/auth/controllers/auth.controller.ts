import { type Request, type Response } from 'express';
import { HttpResponse } from '@response/http.response';
import { AuthService } from '../services/auth.service';

export class AuthController extends AuthService {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {
        super();
    }

    async login(req: Request, resp: Response): Promise<void> {
        try {
            const { body } = req;
            const data = await this.generateJWT(body);

            if (data.user == null) {
                this.httpResponse.BadRequest(
                    resp,
                    'Email o password incorrectos'
                );
                return undefined;
            }

            this.httpResponse.hiddenProperties(data.user);
            this.httpResponse.Ok(resp, data);
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    }
}
