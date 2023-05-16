import bcrypt from 'bcrypt';
import { type UserDTO } from '../dto/user.dto';
import UserModel, { type UserEntity } from '../entities/user.entity';

export class UserService {
    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ email });
        return user;
    }

    async findUserById(id: string): Promise<UserEntity> {
        const user = await UserModel.findOne({ _id: id });
        const userDB = user as UserEntity;

        return userDB;
    }

    async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = body;
        const hash = await bcrypt.hash(newUser.password, 10);

        newUser.password = hash;
        const user = await new UserModel(newUser).save();

        return user;
    }
}
