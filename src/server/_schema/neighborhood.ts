import mongoose from 'mongoose';

const NeighborhoodsSchema = new mongoose.Schema({
    geometry: { 
        coordinates: {
            type: mongoose.Schema.Types.Mixed,
        },
        type: {type: String},
    },
    name: String,
});
export const Neigbourhood = mongoose.model('neighborhoods', NeighborhoodsSchema);