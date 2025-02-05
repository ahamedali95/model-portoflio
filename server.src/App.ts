import cors from 'cors';
import express, { Express } from 'express';

import { loggerMiddleware } from '@@/middleware';
import rootRouter from '@@/resource';

class App {
    private app: Express;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initialize();
    }

    private initialize() {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.startHttpServer();
    }

    private initializeMiddlewares() {
        this.app.use(cors({
            exposedHeaders: 'authorization',
            credentials: true
        }));
        this.app.use(loggerMiddleware);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    private initializeRoutes() {
        this.app.use(rootRouter);
        this.app.use('*', function(req, res){
            res.status(404)
                .send('what???');
        });
    }

    private startHttpServer() {
        this.app.listen(this.port, () => {
            console.log('Server is running at ', this.port);
        });
    }
}

new App(3001);