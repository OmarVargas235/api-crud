import { type NextFunction, type Request, type Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '@middlewares/shared.middleware';
import { UserDTO } from '../dto/user.dto';

export class UserMiddleware extends SharedMiddleware {
    userValidator(req: Request, resp: Response, next: NextFunction): void {
        const { name, lastName, email, password, company } = req.body;

        const valid = new UserDTO();

        valid.name = name;
        valid.lastName = lastName;
        valid.email = email;
        valid.password = password;
        valid.company = company;

        void validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(resp, err);
            } else {
                next();
            }
        });
    }
}
