const express = require("express");
const userController = require("../controllers/user-controller");
//const verifyJWT = require("../middleware/verifyJWT");

const userRouter = express.Router();

userRouter.route("/")
.get(userController.getAllUsers)
.post(userController.postUser);

userRouter.route("/sign_in")
    .post(userController.login)
    .get(userController.newPassword);

userRouter.route("/:id")
.get(userController.getUserById)
.put(userController.updateUser);





module.exports = userRouter;