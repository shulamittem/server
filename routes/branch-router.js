const express = require("express");
const branchController = require("../controllers/branch-controller");

const branchRouter = express.Router();

branchRouter.route("/")
.get(branchController.getAllBranches)
.post(branchController.addBranch)




module.exports = branchRouter;