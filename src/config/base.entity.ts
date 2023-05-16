import { prop } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
    @prop({ type: String, default: () => uuidv4() })
    public readonly _id!: string;

    @prop({ type: Date, default: Date.now })
    public updateAt!: Date;

    @prop({ type: Date, default: Date.now })
    public createAt!: Date;
}
