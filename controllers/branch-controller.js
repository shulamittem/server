
var branchDB = require("../dal/branch-accessor");


class BranchController {

//קבלת פרטי כל הסניפים
    getAllBranches = async(req,res) =>{
        await branchDB.getAllBranches()
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: `Cannot find branches.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: "Error retrieving branches"
            });
          });
        
    }

//הכנסת פרטי סניף

//בדיקה אם הסניף כבר קיים.

    addBranch = async(req,res) =>{
        var branchToAdd = req.body;
        console.log(branchToAdd);
        await branchDB.addBranch(branchToAdd)
        .then(data => {
            res.status(201).json({ message: 'created branch' })
          })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the branch."
            });
        });;
       
    }
  


}
const branchController = new BranchController();

module.exports = branchController;