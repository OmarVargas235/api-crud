import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '@config/base.dto';
import { RoleType } from '@main/user/dto/user.dto';

export class HistoryDTO extends BaseDTO {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastName!: string;

    @IsNotEmpty()
    company!: string;

    @IsNotEmpty()
    email!: string;

    @IsNotEmpty()
    role!: RoleType;
}
