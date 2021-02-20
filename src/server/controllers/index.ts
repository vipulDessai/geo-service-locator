import { Request, Response } from 'express';
import { geoCoding, dbService } from '@/server/_utils';

import { RequestQuery } from '@/server/_types';

export const getGeoSpatialData = async (req: Request<{}, {}, {}, RequestQuery>, res: Response) => {
    const result = await geoCoding(req.query.address);
    res.status(result.status).send(result);
}