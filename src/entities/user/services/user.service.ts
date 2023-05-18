import bcrypt from 'bcrypt';
import { type UserDTO } from '../dto/user.dto';
import UserModel, { type UserEntity } from '../entities/user.entity';
import { type Paginate } from '../interfaces';

export class UserService {
    async findById(id: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ _id: id });
        return user;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ email });
        return user;
    }

    async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = body;
        const hash = await bcrypt.hash(newUser.password, 10);

        newUser.password = hash;
        const user = await new UserModel(newUser).save();

        return user;
    }

    async edituser(id: string, body: UserDTO): Promise<void> {
        const newUser = body;
        const hash = await bcrypt.hash(newUser.password, 10);

        newUser.password = hash;
        await UserModel.findByIdAndUpdate(id, newUser, { new: true });
    }

    async getUsers(query: Paginate, body: UserDTO): Promise<UserEntity> {
        const users = await UserModel.find(body)
            .limit(query.rowsPerPage)
            .skip(query.page);
        const usersDB = users as unknown as UserEntity;

        return usersDB;
    }

    async deleteUser(id: string): Promise<void> {
        await UserModel.deleteOne({ _id: id });
    }
}
