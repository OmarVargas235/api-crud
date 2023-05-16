import { type NextFunction, type Request, type Response } from 'express';
import { validate } from 'class-validator';
import { HttpResponse } from '@response/http.response';
import { UserDTO } from '../dto/user.dto';

export class UserMiddleware {
    private readonly httpResponse: HttpResponse;

    constructor() {
        this.httpResponse = new HttpResponse();
    }

    userValidator(req: Request, resp: Response, next: NextFunction): void {
        const { name, lastName, email, password, phone } = req.body;

        const valid = new UserDTO();

        valid.name = name;
        valid.lastName = lastName;
        valid.email = email;
        valid.password = password;
        valid.phone = phone;
        valid.provider = 'provider';
        valid.provider_id = 'provider_id';

        void validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(resp, err);
            } else {
                next();
            }
        });
    }
}
