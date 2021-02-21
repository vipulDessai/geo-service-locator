import express, { Request } from 'express';

export const router = express.Router();

import { getGeoSpatialData, getCurrentNeighborhoodRestarants } from '@/server/controllers';
import { RequestQuery } from '../_types';

router.get('/geospatial', (req: Request<{}, {}, {}, RequestQuery>, res) => {
   getGeoSpatialData(req, res);
});

router.get('/currentNeighborhoodRestarants', (req: Request, res) => {
   getCurrentNeighborhoodRestarants(req, res);
});