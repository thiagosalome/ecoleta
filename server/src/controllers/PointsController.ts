import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .select('points.*')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct();

    const serializedPoints = points.map((point) => ({
      ...point,
      image_url: `http://192.168.0.82:3333/uploads/${point.image}`,
    }));

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Point not found' });
    }

    const serializedPoint = {
      ...point,
      ...point,
      image_url: `http://192.168.0.82:3333/uploads/${point.image}`,
    };

    const items = await knex('items')
      .select('items.title')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id);

    return response.json({ point: serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    // Inserindo os dados
    const insertedIds: any | number[] = await trx('points').insert(point);

    const pointId: number = insertedIds[0];

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((itemId: number) => ({
        item_id: itemId,
        point_id: pointId,
      }));

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      point,
      items,
    });
  }
}

export default PointsController;
