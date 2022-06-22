import express from 'express';

const homeRoutes = express.Router();

homeRoutes.get('/', async (req, res) => {
  res.send(`<h1>Bismillah hir Rahmanir Rahim<h1>`);
});
export default homeRoutes;
