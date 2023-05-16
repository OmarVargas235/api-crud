import { mongoose, prop } from '@typegoose/typegoose';

export abstract class History {
    @prop()
    _id_user!: mongoose.Types.ObjectId;

    @prop({ type: String })
    name!: string;

    @prop({ type: String })
    description!: string;

    @prop({ type: Date, default: Date.now })
    created_at!: Date;
}
