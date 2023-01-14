const dataController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAll, create, getById, update, deleteById, getByUserId } = require('../services/itemService');
const { parseError } = require('../utils/parser');


dataController.get('/', async (req, res) => {
  let items = [];
  if (req.query.where) {
    const userId = JSON.parse(req.query.where.split('=')[1]);
    items = await getByUserId(userId);
  } else {
    items = await getAll();
  }

  res.json(items);
});

dataController.post('/', hasUser(), async (req, res) => {
  try {
    const data = Object.assign({ _ownerId: req.user._id }, req.body);
    const item = await create(data);
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: parseError(error) });
  }
});

dataController.get('/:id', async (req, res) => {
  const item = await getById(req.params.id);
  res.json(item);
});

dataController.put('/:id', hasUser(), async (req, res) => {
  const item = await getById(req.params.id);

  if (req.user._id != item._ownerId) {
    return res.status(403).json({ message: 'You cannot edit this record' });
  }

  try {
    const result = await update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: parseError(error) });
  }
});

dataController.delete('/:id', async (req, res) => {
  const item = await getById(req.params.id);

  if (req.user._id != item._ownerId) {
    return res.status(403).json({ message: 'You cannot edit this record' });
  }

  try {
    await deleteById(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: parseError(error) });
  }
});

module.exports = dataController;