import mongoose from 'mongoose';

const RestaurantsSchema = new mongoose.Schema({
    geometry: { 
        coordinates: {
            type: mongoose.Schema.Types.Mixed,
        },
        type: {type: String},
    },
    name: String,
});
export const Restaurants = mongoose.model('restaurants', RestaurantsSchema);