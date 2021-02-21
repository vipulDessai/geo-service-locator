import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';

import { router } from '@/server/routes';
import { dbService } from '@/server/_utils';

const db = dbService.dbInit();
db.on('error', (error) => {
    console.log(error);
});

const app = express();

let proxyUrlString = "/";
if(process.env.NODE_ENV === "development")
    proxyUrlString = "/development";

app.use(proxyUrlString, router);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(path.join('build', 'index.html')));
});

// expose the bundled client folder 
app.use(express.static(path.join('build')));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Running on localhost:${port}`));