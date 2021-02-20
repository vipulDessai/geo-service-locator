import { Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const geoCoding = async (address: string) => {
    let err, data, status;
    try {
        const response: any = await client.geocode({
            params: {
                address: address,
                key: process.env.GEO_CODING_API_KEY,
            },
            timeout: 1000,
        });

        if(response.status == 200) {
            data = {
                geospatial: response.data.data,
            }
        }
        else {
            err = response;
        }
    }
    catch(e) {
        status = 500;
        err = e;
        data = undefined;
    }

    return {err, data, status}; 
};