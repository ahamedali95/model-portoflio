import fs from 'fs';
import path from 'path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express, { Express } from 'express';

import { loggerMiddleware } from './middleware';
import resolvers from './resource';

class App {
    private app: Express;
    private port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.initialize();
    }

    private async initialize() {
        await this.initializeMiddlewares();
        this.initializeRoutes();
        this.startHttpServer();
    }

    private async initializeMiddlewares() {
        this.app.use(cors({
            exposedHeaders: 'authorization',
            credentials: true
        }));
        this.app.use(loggerMiddleware);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        const typeDefs = fs.readFileSync(path.join(process.cwd(), 'graphql-schemas', 'portfolio.graphql'), 'utf-8');
        const server = new ApolloServer({
            typeDefs: typeDefs,
            resolvers
        });
        await server.start();
        //@ts-ignore
        this.app.use('/graphql', expressMiddleware(server, {
            context: async ({ req, res }) => ({
                req,
                res
            })
        }));
    }

    private initializeRoutes() {
        // this.app.use(rootRouter);
        process.env.NODE_ENV === 'production' && this.app.use(express.static(path.join(process.cwd(), 'build', 'ui')));

        this.app.get('*', (req, res) => {
            res.status(200)
                .sendFile(path.join(process.cwd(), 'build', 'ui', 'index.html'));
        });
    }

    private startHttpServer() {
        this.app.listen(this.port, () => {
            console.log('Server is running at ', this.port);
        });
    }
}

new App(3001);