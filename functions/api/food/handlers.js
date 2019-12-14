const { db } = require("../../firebase");
const { withTryCatch } = require("../../utils/errors");
const { getUserDocsInCol } = require("../../utils/db");

const collection = "food";

const getAllOwn = async ({ user: { user_id } }, res) => {
  const userFood = await getUserDocsInCol(collection, user_id);

  const food = userFood.docs.map(doc => {
    const { user, ...foodData } = doc.data();

    return { ...foodData, id: doc.id };
  });

  return res.status(200).json({ food });
};

const getOne = async (req, res) => {
  const { user, ...foodData } = req.doc.data();
  return res.status(200).json({ ...foodData });
};

const create = async ({ user: { user_id }, body }, res) => {
  const { name, calories, protein, carbohydrates, fat } = body;
  const newFood = {
    user: user_id,
    name,
    calories,
    protein,
    carbohydrates,
    fat
  };

  const createdDoc = await db.collection(collection).add(newFood);
  const responseData = { ...newFood, id: createdDoc.id };

  return res.status(201).json(responseData);
};

const update = async ({ body, doc }, res) => {
  const { name, calories, protein, carbohydrates, fat } = body;
  const updateData = {
    name,
    calories,
    protein,
    carbohydrates,
    fat
  };

  await doc.ref.update(updateData);
  return res.status(200).json({ msg: "Success" });
};

module.exports = {
  getAllOwn: async (req, res) => await withTryCatch(req, res, getAllOwn),
  getOne: async (req, res) => await withTryCatch(req, res, getOne),
  create: async (req, res) => await withTryCatch(req, res, create),
  update: async (req, res) => await withTryCatch(req, res, update)
};