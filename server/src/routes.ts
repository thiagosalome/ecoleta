import { Router } from 'express';

// Controllers
import ItemsController from './controllers/ItemsController';
import PointsControler from './controllers/PointsController';

const routes = Router();

// Instances
const itemsController = new ItemsController();
const pointsController = new PointsControler();

// Items
routes.get('/items', itemsController.index);

// Points
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

export default routes;
