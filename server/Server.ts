import { Test } from "common/models/test";
import { Express, static as eStatic } from "express";
import path from 'path';

export class Server {
    private app: Express;

    constructor(app: Express) {
        this.app = app;

        this.app.use(eStatic(path.resolve('./') + '/build/frontend'));

        this.app.get('/api', (req, res) => {
            const message: Test = {
                id: 6,
                message: 'Hello world!',
            };
            res.send(message);
        });

        this.app.get('*', (req, res) => {
            res.sendFile(path.resolve('./') + '/build/frontend/index.html');
        });
    }

    public start(port: number) {
        this.app.listen(port, () => 
            console.log(`Server listening on port ${port}!`)
        );
    }
}