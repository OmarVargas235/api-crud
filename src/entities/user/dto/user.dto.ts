import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '@config/base.dto';

export enum RoleType {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export class UserDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    company!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;
}
