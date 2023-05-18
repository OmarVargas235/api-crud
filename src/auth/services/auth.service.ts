import { ConfigServer } from '@config/config';
import { UserService } from '@main/user/services/user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { type UserEntity } from '@main/user/entities/user.entity';

interface CredentialsUser {
    password: string;
    email: string;
}

export class AuthService extends ConfigServer {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt
    ) {
        super();
    }

    public async validateUser(
        email: string,
        password: string
    ): Promise<UserEntity | null> {
        const user = await this.userService.findByEmail(email);

        if (user != null) {
            const isMath = await bcrypt.compare(password, user.password);
            if (isMath) return user;
        }

        return null;
    }

    sign(payload: jwt.JwtPayload, secret: string): string {
        return this.jwtInstance.sign(payload, secret, { expiresIn: '1h' });
    }

    public async generateJWT(
        user: CredentialsUser
    ): Promise<{ accessToken: string; user: UserEntity | null }> {
        const data = await this.validateUser(user.email, user.password);

        const payload = {
            role: data?.role,
            sub: data?._id
        };

        return {
            accessToken:
                data != null
                    ? this.sign(
                          payload,
                          this.getEnvironment('JWT_SECRET') ?? ''
                      )
                    : '',
            user: data
        };
    }
}
