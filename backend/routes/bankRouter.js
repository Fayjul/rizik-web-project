import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth } from '../utils.js';

const bankRouter = express.Router();

bankRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id);
    console.log('User not found');
    res.send(users);
  })
);
bankRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (user) {
      user.balance = req.body.newBalance || user.balance;
      const updateUser = await user.save();
      res.send({ message: 'User Updated', user: updateUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default bankRouter;
