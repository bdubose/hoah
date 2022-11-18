import { Test } from "common/models/test";
import { Express, Router } from "express";
import express from 'express';
import path from 'path';

export class Server {
    private app: Express;

    constructor(app: Express) {
        this.app = app;
        app.use(express.static(path.join('build', 'client')));
        app.get('/api/test', (req, res) => {
            const message: Test = {
                id: 22,
                message: 'from the serverside',
            };
            res.send(message);
        });
    }

    public start(port: number) {
        this.app.listen(port, () => 
            console.log(`Server listening on port ${port}!`)
        );
    }
}