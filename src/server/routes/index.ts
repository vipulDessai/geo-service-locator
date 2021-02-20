import express from 'express';

export const router = express.Router();

router.get('/address', (req, res) => {
   res.send("address");
});