const { Router } = require("express");

const { create, getAllOwn, remove, update } = require("./handlers");
const { validateCreate, validateUpdate } = require("./validators");
const {
  validationErrors,
  createDocExistsAndIsOwner
} = require("../../middleware");
const docExistsAndIsOwner = createDocExistsAndIsOwner("categories");

const router = Router();

router.get("/", getAllOwn);
router.post("/", validateCreate(), validationErrors, create);
router.put(
  "/:id",
  validateUpdate(),
  validationErrors,
  docExistsAndIsOwner,
  update
);
router.delete("/:id", docExistsAndIsOwner, remove);

module.exports = router;
