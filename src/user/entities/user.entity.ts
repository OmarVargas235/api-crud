import { prop, getModelForClass } from '@typegoose/typegoose';
import { BaseEntity } from '@config/base.entity';
import { Followers } from './followers.entity';
import { Ocupation } from './ocupation.entity';
import { PhotoEntity } from './photo.entity';
import { History } from './history.entity';
import { RoleType } from '../dto/user.dto';

export class UserEntity extends BaseEntity {
    @prop({ type: String, required: true })
    name!: string;

    @prop({ type: String, required: true })
    lastName!: string;

    @prop({ type: String, required: true, unique: true })
    email!: string;

    @prop({ type: String, default: '' })
    gender!: string;

    @prop({ type: String, required: true })
    phone?: string;

    @prop({ type: String, required: true })
    password!: string;

    @prop({ type: String, default: '' })
    visible!: string;

    @prop({ type: () => Followers, default: {} })
    followers!: Followers;

    @prop({ type: () => [Ocupation], default: [] })
    ocupation!: Ocupation[];

    @prop({ type: String })
    provider!: string;

    @prop({ type: String, unique: true })
    provider_id!: string;

    @prop({ type: () => [PhotoEntity], default: [] })
    photo!: PhotoEntity[];

    @prop({ type: String })
    tokenforgetpassword?: string;

    @prop({ type: () => [History], default: [] })
    history!: History[];

    @prop({
        enum: RoleType,
        nullable: false,
        default: RoleType.ENCARGADO
    })
    role!: RoleType;
}

const userModel = getModelForClass(UserEntity);

export default userModel;
