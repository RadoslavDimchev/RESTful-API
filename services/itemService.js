const Item = require('../models/Item');


async function getAll() {
  return Item.find({});
}

async function getByUserId(userId) {
  return Item.find({_ownerId: userId});
}

async function getById(id) {
  return Item.findById(id);
}

async function create(item) {
  return Item.create(item);
}

async function update(id, data) {
  const item = await Item.findById(id);

  item.make = data.make;
  item.model = data.model;
  item.year = data.year;
  item.description = data.description;
  item.price = data.price;
  item.img = data.img;
  item.material = data.material;

  return item.save();
}

async function deleteById(id) {
  return Item.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getByUserId,
  getById,
  create,
  update,
  deleteById
};