import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const bankRouter = express.Router();

bankRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id);
    console.log('User not found');
    res.send(users);
  })
);

export default bankRouter;
