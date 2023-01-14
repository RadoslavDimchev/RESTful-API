const authController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { register, login, logout } = require('../services/userService');
const { parseError } = require('../utils/parser');


authController.post('/register',
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isEmail().withMessage('Password must be at least 3 characters long'),
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      throw errors;
    }

    try {
      const token = await register(req.body.email, req.body.password);
      res.json(token);
    } catch (error) {
      res.status(400).json({ message: parseError(error) });
    }
  });

authController.post('/login', async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.json(token);
  } catch (error) {
    res.status(401).json({ message: parseError(error) });
  }
});

authController.get('/logout', async (req, res) => {
  const token = req.token;
  await logout(token);
  res.status(204).end();
});

module.exports = authController;