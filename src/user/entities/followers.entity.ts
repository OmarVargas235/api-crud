import { mongoose, prop } from '@typegoose/typegoose';

export abstract class Followers {
    @prop()
    _id_user!: mongoose.Types.ObjectId;
}
