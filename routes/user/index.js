const router = require("express").Router();
const userController = require("../../controllers/userController");

//get all users data
router.get("/", userController.findAll);

//get one user data find by any
router.get("/:id", userController.find);

//update a user
router.patch("/:id", userController.update)

//delete a user
router.delete("/:id", userController.delete)

//register new user
router.post("/", userController.create);

//login a user
router.post("/login", userController.login);

module.exports = router;