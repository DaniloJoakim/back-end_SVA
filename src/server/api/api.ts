
import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';

import Routes from './routes/routes';
import Handlers from './responses/handlers';

class Api {

    public express: Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    middleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());

        this.express.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
            if (req.method == 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });

        this.routers(this.express, Handlers.authzHandlerApi);
        this.express.use(Handlers.notFoundHandlerApi);
        this.express.use(Handlers.errorHandlerApi);
    }

    protected routers(app: Application, authz: any): void {
        Routes.initRoutes(app, authz);
    }
}

export default new Api().express;
