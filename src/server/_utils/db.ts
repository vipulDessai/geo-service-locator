import mongoose from 'mongoose';

import { Neigbourhood } from '@/server/_schema';

import { FindTypes } from '@/server/_types';

export const dbService = {
    dbInit: function () {
        mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        return mongoose.connection;
    },
    getRequest: async function (query: any, findType: FindTypes) {
        let err, response, status;
        switch(findType) {
            case FindTypes.FIND: 
                const findQueryResult: any = await Neigbourhood.find(query);
                if (!findQueryResult.errors) {
                    if (findQueryResult && findQueryResult.length) {
                        response = findQueryResult;
                        status = 200;
                    }
                    else {
                        handleErr('No proper data returned', 500);
                    }
                }
                else {
                    handleErr(findQueryResult.errors, 500);
                }
                break;

            case FindTypes.FIND_ONE: 
                const findOneQueryResult: any = await Neigbourhood.findOne(query);
                if (!findOneQueryResult.errors) {
                    if (findOneQueryResult && findOneQueryResult._doc) {
                        response = findOneQueryResult._doc;
                        status = 200;
                    }
                    else {
                        handleErr('No proper data returned', 500);
                    }
                }
                else {
                    handleErr(findOneQueryResult.errors, 500);
                }
                break;
        }

        function handleErr(errors: any, statusCode: number) {
            err = errors;
            status = statusCode;
        }

        return { err, response, status };
    }
};