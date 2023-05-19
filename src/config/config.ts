import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv
        });
    }

    public getEnvironment(k: string): string | undefined {
        return process.env[k];
    }

    public getNumberEnv(k: string): number {
        return Number(this.getEnvironment(k));
    }

    public get nodeEnv(): string {
        return this.getEnvironment('NODE_ENV')?.trim() ?? '';
    }

    public createPathEnv(path: string): string {
        const arrEnv: string[] = ['env'];

        if (path.length > 0) {
            const stringToArray = path.split('.');
            arrEnv.unshift(...stringToArray);
        }

        return '.' + arrEnv.join('.');
    }

    public async connectMongoDB(): Promise<void> {
        const urlLocal = `mongodb://${this.getEnvironment('DB_USER') ?? ''}:${
            this.getEnvironment('DB_PASSWORD') ?? ''
        }@${this.getEnvironment('DB_HOST') ?? ''}:${
            this.getEnvironment('DB_PORT') ?? ''
        }/${this.getEnvironment('DB_DATABASE') ?? ''}?authSource=admin`;

        const url = this.getEnvironment('DB_MONGO_ATLAS') ?? urlLocal;

        await mongoose.connect(url);
    }
}
