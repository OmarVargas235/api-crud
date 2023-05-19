import { prop, getModelForClass } from '@typegoose/typegoose';
import { BaseEntity } from '@config/base.entity';
import { RoleType } from '@main/user/dto/user.dto';

export class HistoryEntity extends BaseEntity {
    @prop({ type: String, required: true })
    name!: string;

    @prop({ type: String, required: true })
    lastName!: string;

    @prop({ type: String, required: true })
    company!: string;

    @prop({ type: String, required: true, unique: true })
    email!: string;

    @prop({
        type: String,
        enum: RoleType,
        nullable: false
    })
    role!: RoleType;
}

const historyModel = getModelForClass(HistoryEntity);

export default historyModel;
