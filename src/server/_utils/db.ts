import mongoose from 'mongoose';

export const dbService = {
    dbInit: function () {
        mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        return mongoose.connection;
    },
    getRequest: async function (params: any) {
        const userAccountSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            userName: String,
            password: String
        });
        const Account = mongoose.model('Account', userAccountSchema);

        const dbSaveResult: any = await Account.find(params);

        let err, response;
        if (!dbSaveResult.errors) {
            // the user exist case
            if (dbSaveResult && dbSaveResult.length > 0 && dbSaveResult[0]._doc) {
                response = dbSaveResult[0];
            }
            // user does NOT exist case
            else {
                err = {
                    message: 'User name / Password is incorrect',
                    status: 401,
                };
            }
        }
        else {
            err = dbSaveResult.errors;
            err.status = 500;
        }

        return { err, response };
    }
};