import { Router } from 'express';

import models from '../models';

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { User } = models;

const authRouter = new Router();

authRouter.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({
    email, password, name,
  });

  res.json({
    createdId: user.id,
  });
});

authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ where: { email: email }});

  if (bcrypt.compareSync(password, user.get('password'))) {
    const token = crypto.randomBytes(32).toString('hex');
    user.set('token', token);
    await user.save();
    res.json({
      token
    });
  } else {
    res.status(404).json({ QwQ: 'QwQ' });
  }
});

export default authRouter;
