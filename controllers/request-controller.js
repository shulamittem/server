
var requestDB = require("../dal/request-accessor")

class RequestController {

    //קבלת פרטי כל הבקשות
    getAllRequests = async(req, res) =>{
        await requestDB.getAllRequests()
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find requests.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving requests"
            });
          });;
    }

    //שליחת בקשה חדשה
    addRequest = async(req, res) =>{
        var requestDetails  = req.body;
        await requestDB.addRequest(requestDetails)
        .then(data => {
            res.status(201).json({ message: 'enter request successfuly!' })
          })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the request."
            });
        });;
       
    }

    //קבלת בקשות של עובד לפי מספר זהות עפ"י הסטטוס המבוקש
    getRequestsByIdCopy = async(req, res) =>{
        var id = req.params.id;
        var status = req.query.status;
        console.log(status);
        await requestDB.getRequestsById(id,status).then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find requests by status.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving requests"
            });
          });
       
    }


       //קבלת בקשות של עובד לפי מספר זהות 
       getRequestsById = async(req, res) =>{
        var id = req.params.id;
        await requestDB.getRequestsById(id).then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find requests .`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving requests"
            });
          });
       
    }
   //   // //הוספת בקשה לעובד מסוים
   //   // addRequest = async(req, res) =>{
   //   //     var id = req.params.id;
   //   //     var requestDetails  = req.body;
   //   //     await requestDB.addRequest(id,requestDetails);
   //   // } 

   //עדכון פרטי בקשה
        updateRequest =async(req, res) =>{
          const id=req.params.id;
          requestDB.updateRequest(id ,req.body)
        .then(num => {
            if (num == 1) {
              res.send({
                message: "request was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update request with id=${id}. Maybe requst was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: err.message||"Error updating request with id=" + id
            });
          });
        }





    // מחיקת בקשה שנשלחה מעובד מסוים על פי מספר הבקשה
    deleteRequest = async(req, res) =>{
        var id = req.params.id;
        await requestDB.deleteRequest(id);
        res.send("delete request successfuly!")
        .then(num => {
            if (num == 1) {
              res.send({
                message: "request was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete request with id=${id}. Maybe request was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: err.message||"Could not delete request with id=" + id
            });
          });
    } 
}

const requestController = new RequestController();

module.exports = requestController;