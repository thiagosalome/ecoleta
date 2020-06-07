import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(cors());
app.use(routes);

app.listen(3333);
