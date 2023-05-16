import { IsDate, IsOptional } from 'class-validator';

export class BaseDTO {
    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
