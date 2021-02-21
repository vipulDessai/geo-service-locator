import { Request, Response } from 'express';
import { geoCoding, dbService } from '@/server/_utils';

import { RequestQuery, FindTypes } from '@/server/_types';

export const getGeoSpatialData = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
    const result = await geoCoding(req.query.address);
    res.status(result.status).send(result);
}

export const getCurrentNeighborhoodRestarants = async (req: Request, res: Response) => {
    const neighborhoodQuery = { geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } };
    const neighborhoodResult = await dbService.getRequest(neighborhoodQuery, FindTypes.FIND_ONE);

    const totalRestaurantsQuery = { location: { $geoWithin: { $geometry: neighborhoodResult.response.geometry } } };
    const result = await dbService.getRequest(totalRestaurantsQuery, FindTypes.FIND);
    res.status(result.status).send(result);
}