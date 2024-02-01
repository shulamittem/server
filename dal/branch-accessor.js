// var branches = [
//     {
//         "id": 1,
//         "name": "moshe cohen from data",
//         "class": "a"
//     },
//     {
//         "id": 2,
//         "name": "israel levi from data",
//         "class": "b"
//     },
//     {
//         "id": 3,
//         "name": "yehuda katz from data",
//         "class": "c"
//     },
//     {
//         "id": 4,
//         "name": "reuven hhhh from data",
//         "class": "a"
//     }
// ];

const db =require('../models/index')
const branch= db.branch;

class BranchDatsAccessor {

    
    getAllBranches = async() => {
        const x= await branch.findAll();
        return x;
    }

    addBranch = async(branchToAdd) => {
        return await branch.create(branchToAdd);
    }

}
const branchDatsAccessor = new BranchDatsAccessor();

module.exports = branchDatsAccessor;