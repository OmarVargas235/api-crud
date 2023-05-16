import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '@config/base.dto';

export enum RoleType {
    ENCARGADO = 'ENCARGADO',
    ADMIN = 'ADMIN'
}

export class UserDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsNotEmpty()
    phone!: string;

    @IsNotEmpty()
    provider!: string;

    @IsNotEmpty()
    provider_id!: string;
}
