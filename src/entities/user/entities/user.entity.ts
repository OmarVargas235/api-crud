import { prop, getModelForClass } from '@typegoose/typegoose';
import { BaseEntity } from '@config/base.entity';
import { RoleType } from '../dto/user.dto';

export class UserEntity extends BaseEntity {
    @prop({ type: String, required: true })
    name!: string;

    @prop({ type: String, required: true })
    lastName!: string;

    @prop({ type: String, required: true })
    company!: string;

    @prop({ type: String, required: true, unique: true })
    email!: string;

    @prop({ type: String, required: true })
    password!: string;

    @prop({
        enum: RoleType,
        nullable: false,
        default: RoleType.USER
    })
    role!: RoleType;
}

const userModel = getModelForClass(UserEntity);

export default userModel;
