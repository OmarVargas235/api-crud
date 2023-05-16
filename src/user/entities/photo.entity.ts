import { prop } from '@typegoose/typegoose';

export abstract class PhotoEntity {
    @prop({ type: String, required: false })
    link!: string;

    @prop({ type: String })
    name!: string;
}
