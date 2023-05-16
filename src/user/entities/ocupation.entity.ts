import { prop } from '@typegoose/typegoose';

export abstract class Ocupation {
    @prop({ type: String, required: true })
    name!: string;
}
