const express = require("express");
const workerController = require("../controllers/worker-controller");
const worker = require("../models/worker");

const workerRouter = express.Router();

workerRouter.route("/")
.get(workerController.getAllWorkers)
.post(workerController.postWorker);

workerRouter.route("/branch/:id")
.get(workerController.getWorkersByBranch_id);

workerRouter.get("/manager",workerController.getManagers);
workerRouter.get("/role",workerController.getRoles);
workerRouter.get("/traveling",workerController.getTraveling);
workerRouter.route("/:worker_id")
.get(workerController.getWorkerById)
.post(workerController.addDocuments)
.put(workerController.updateWorker)
.delete(workerController.deleteWorker);






module.exports = workerRouter;