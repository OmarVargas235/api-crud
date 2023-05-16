import { type Request, type Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { HttpResponse } from '@response/http.response';
import { AuthService } from '../services/auth.service';
import { type Profile } from 'passport';
import { type UserDTO } from '@main/user/dto/user.dto';
import UserModel, { type UserEntity } from '@main/user/entities/user.entity';

interface UserProfile extends Profile {
    role: string;
    _id: string;
    isEmpty: boolean;
    email: string;
    sub: string;
}

export class AuthStrategyController extends AuthService {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {
        super();
    }

    authentication = async (req: Request, resp: Response): Promise<void> => {
        try {
            const user = req.user as UserProfile;
            const data = {
                accessToken: this.sign(
                    {
                        provider: user.provider,
                        sub: user.sub ?? user.role,
                        id: user.id ?? user._id
                    },
                    this.getEnvironment('JWT_SECRET') ?? ''
                ),
                user: {}
            };

            if (user.isEmpty) {
                await this.createUser({
                    email: user.email,
                    name: user.name?.givenName ?? user.displayName,
                    lastName: user.displayName ?? user.name?.givenName,
                    password: uuid(),
                    phone: 'undefined',
                    provider: user.provider,
                    provider_id: user._id ?? user.id
                });

                data.user = {
                    email: user.email,
                    name: user.name?.givenName ?? user.displayName
                };
            }

            !user.isEmpty && (data.user = user);
            !user.isEmpty && this.httpResponse.hiddenProperties(data.user);

            this.httpResponse.Ok(resp, data);
        } catch (err) {
            this.httpResponse.Error(resp, err);
        }
    };

    private async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = body;
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;
        const user = await new UserModel(newUser).save();

        return user;
    }
}
