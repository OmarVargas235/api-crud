import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { ConfigServer } from '@config/config';
import { UserRouter } from './user/user.router';
// import { AuthRouter } from '@auth/auth.router';

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private readonly port: number = this.getNumberEnv('PORT');

    constructor() {
        super();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        void this.dbConnect();

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): express.Router[] {
        // return [new AuthRouter().router];
        return [new UserRouter().router];
    }

    async dbConnect(): Promise<void> {
        try {
            await this.connectMongoDB();
            console.log(`🚀  Database Connected`);
        } catch (err) {
            const error = err as string;
            console.log(`🧯 Database Connection Error: ${error.toString()}`);
        }
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el puerto: ${this.port}`);
        });
    }
}

new ServerBootstrap();
