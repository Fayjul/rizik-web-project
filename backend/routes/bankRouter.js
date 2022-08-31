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
      //console.log(user.name);
      user.balance = req.body.newBalance || user.balance;
      const updateUser = await user.save();
      res.send({ message: 'User Updated', user: updateUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
bankRouter.put(
  '/payment',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (user) {
      console.log(user.name);
      const newBalance = user.balance - req.body.totalPrice;
      console.log(newBalance);
      user.balance = newBalance;
      const updateUser = await user.save();
      res.send({ message: 'User Updated', user: updateUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }

    const admin = await User.find().select({ isAdmin: 'true' });
    if (admin) {
      const newBalance = admin.balance + req.body.totalPrice;
      admin.balance = newBalance;
      const updateAdmin = await admin.save();
      res.send({ message: 'Admin Updated', user: updateAdmin });
    } else {
      res.status(404).send({ message: 'Admin Not Found' });
    }
  })
);
export default bankRouter;
