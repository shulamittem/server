const express = require("express");
const requestController = require("../controllers/request-controller");

const requestRouter = express.Router();

requestRouter.route("/")
.get(requestController.getAllRequests)
.post(requestController.addRequest)

requestRouter.route("/:id")
.get(requestController.getRequestsById)
.put(requestController.updateRequest)
//.post(requestController.addRequest)
.delete(requestController.deleteRequest)



module.exports = requestRouter;
