import express from 'express';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate'
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(cors());
app.use(routes);
app.use(errors())

app.listen(3333);
