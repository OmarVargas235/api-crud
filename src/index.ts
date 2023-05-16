import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { ConfigServer } from '@config/config';
import { UserRouter } from '@main/user/user.router';
import { ProductRouter } from '@main/product/product.router';
import { ShoppingRouter } from '@main/shoping/shopping.router';
import { AuthRouter } from '@auth/auth.router';
import { LoginGoogle } from '@auth/strategies/google.strategy';
import { LoginFacebook } from '@auth/strategies/facebook.strategy';
import { AuthStrategyRouter } from '@auth/authstrategy.router';

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private readonly port: number = this.getNumberEnv('PORT');

    constructor() {
        super();

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(passport.initialize());

        this.passportUse();
        void this.dbConnect();

        this.app.use('/api', this.routers());
        this.listen();
    }

    passportUse(): unknown[] {
        return [new LoginGoogle().use, new LoginFacebook().use];
    }

    routers(): express.Router[] {
        return [
            new UserRouter().router,
            new ProductRouter().router,
            new ShoppingRouter().router,
            new AuthRouter().router,
            new AuthStrategyRouter().router
        ];
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
