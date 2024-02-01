
var workerDB = require("../dal/worker-accessor");
var requestDB=require("../dal/request-accessor");
//var createForms=require("../services/addForms")
const {uploadDocument }=require('../services/uploadDocuments');


const base64toFile = require('node-base64-to-file');
             const path = require("path")
             const {v4:uuid} = require("uuid")

class WorkerController {

// פרטי כל העובדים
    getAllWorkers = async(req, res) =>{
        await workerDB.getAllWorkers()
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find workers' details.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving workers' details"
            });
          });    
        };
    

//קבלת פרטי עובדים לסניף ספציפי
    getWorkersByBranch_id = async(req, res) =>{
        var id = req.params.id;
        await workerDB.getWorkersByBranch_id(id)
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find workers' details to specipic branch.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving workers' details to specipic branch"
            });
        }); 
    }


//קבלת פרטי עובד
    getWorkerById = async(req, res) =>{
        // console.log(req.query.id);
        var id = req.params.worker_id;
        await workerDB.getWorkerById(id)
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find worker's details to specipic branch.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving worker's details to specipic branch"
            });
        }); 
        
    }

//הכנסת עובד חדש

    postWorker = async(req, res) =>{
      //פרטי עובד +פרטי העסקת עובד+שעות העבודה+טבלת גישור 4 טבלאות.

    var workerToAdd = req.body;
    //check if existing
    var isExist=await workerDB.getWorkerByBranchId( workerToAdd.worker_branch.id)
            if (isExist){
              res.status(400).json({ message: 'worker is already exist!'});
            }
                 
            else{
              console.log(isExist);
            console.log(workerToAdd);
          
            var w=workerDB.postWorker(workerToAdd);
            var r=requestDB.addRequest(workerToAdd.request);
            await r,w
            .then(data => {
                res.status(201).json({ message: 'enter worker successfuly' })
              })
            .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the worker."
                });
            });
        }
    }
//עדכון עובד
    updateWorker =async(req, res) =>{
     const id=req.params.worker_id;
     workerDB.updateWorker(id ,req.body)
    .then(num => {
        if (num == 1) {
          res.send({
            message: "worker was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update worker with id=${id}. Maybe worker was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message||"Error updating worker with id=" + id
        });
      });
    }

// מחיקת עובד
    deleteWorker = async(req, res) =>{ 
        var id = req.params.worker_id;
        await workerDB.deleteWorker(id)
        await workerDB.deleteWorkerDetails(id)
        .then(num => {
            if (num == 1) {
              res.send({
                message: "worker was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete worker with id=${id}. Maybe worker was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: err.message||"Could not delete worker with id=" + id
            });
          });
    }

//קבלת רשימת המעסיקים
    getManagers = async(req, res) =>{
        await workerDB.getManagers()
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find employing list.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving employing"
            });
          });
        }

//קבלת רשימת התפקידים
    getRoles = async(req, res) =>{
       await workerDB.getRoles()
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find rolelist.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving roles"
            });
          });    
        }

//קבלת רשימת האוזורים עם הקוד של הזכאות לנסיעות
        getTraveling = async(req, res) =>{
          await workerDB.getTraveling()
           .then(data => {
               if (data){
                   res.send(data);
               } 
               else {
                 res.status(404).send({
                   message: `Cannot find travelinglist.`
                   });
               }
           })
           .catch(err => {
               res.status(500).send({
                 message: err.message || "Error retrieving traveling"
               });
             });    
           }

           //add duduments
          //  addDocuments = (req, res)=>{

          //   try
          //   {
          //     this.addDocuments2(req.body, 38)
          //     res.status(201).json({ message: 'created documents' })
          //   }
          //   catch(err)
          //   {
          //     res.status(400).json({ message: `can't create documents. ${err}` })
          //   }
          // }
          // addDocuments2=(documents, fileId)=>
          //   {
          //     console.log("documents",documents);
          //       docsToCreate= documents.map((doc)=> {return {fileId: fileId, name: doc.name}})
          //       documentDal.addDocument(docsToCreate)
          //       .then(data => {
          //           if(!data)
          //           {
          //             throw new Error("can't add document to DB")
          //           }
          //           console.log(data);

          //       documents.forEach(doc => {
          //         const type= doc.document.slice(4, doc.document.indexOf(';'));
          //           uploadDocument(doc.document, doc.name, type,fileId );
          //         });

          //     });
              
          //    }


             
          addDocuments = async(req, res)=>{
 
             let imagePath=""
             //pay attention where to save the files!
                     const folder = path.join(__dirname, "..", "public", "images")
                     const filename = `${uuid()}`
                     const fileUrl  =`${folder}\\${filename}.png`
                     
                    //  console.log( fileUrl);
                     // const base64String ="";
                     const base64String=req.body.base64data;
                  // console.log(base64String);
                    //  const allAds=await AdvertismentDB.getAllAds();
                     //const maxId =allAds[allAds.length-1].Id+1
                     
                    try {
                    // imagePath = await base64toFile(base64String, { filePath: "./img", fileName: "/ad_"+1+"_"+req.body.AdOwner, types: ['jpeg'], fileMaxSize: 3145728 });
                     imagePath = await base64toFile(base64String, { filePath:folder, fileName:filename, types: ['png'], fileMaxSize: 3145728 });
                     console.log("path",imagePath);
                     } catch (error) {
                        console.log(error);
                      return res.status(400).json({ message: 'error occured while loading image'})
                     }
                    }
}

const workerController = new WorkerController();

module.exports = workerController;