const { Router } = require("express");

const { create, update, getDayMeals } = require("./handlers");
const { deleteDoc } = require("../../utils/db");
const { validateCreate, validateUpdate, validateGet } = require("./validators");
const {
  validationErrors,
  createDocExistsAndIsOwner
} = require("../../middleware");
const docExistsAndIsOwner = createDocExistsAndIsOwner("meals");

const router = Router();

router.get("/", validateGet(), validationErrors, getDayMeals);
router.post("/", validateCreate(), validationErrors, create);
router.put(
  "/:id",
  validateUpdate(),
  validationErrors,
  docExistsAndIsOwner,
  update
);
router.delete("/:id", docExistsAndIsOwner, deleteDoc);

module.exports = router;
