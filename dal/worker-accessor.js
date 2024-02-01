const db =require('../models/index')
const worker= db.worker;
const worker_branch=db.worker_branch;
const employing_details=db.employing_details;
const manager=db.manager;
const role=db.role;
const traveling=db.traveling_rate;
const employing_days=db.employing_days

class WorkerDatsAccessor {

    getAllWorkers = async() => {       
      return await employing_details.findAll({
            include:[
                        {model:db.worker_branch,    
                            attributes: [] ,  
                            include:[{model:db.branch,  attributes: ['branch_name'] },
                                     {model:db.worker,  attributes: ['firstName','lastName'] },
                                     { model:db.active_request,  attributes:['creationdate'],
                                         include:[{model:db.request_status,  attributes:['request_description']},
                                                  {model:db.request_type,  attributes:['request_type']}]
                                     }]},
                        {model:db.role,  attributes: ['role_name']  ,as:'role1'},
                        {model:db.role,  attributes: ['role_name']  ,as:'role2'}, 
                        {model:db.role,  attributes: ['role_name']  ,as:'role3'},  
                        {model:db.contract_status,  attributes: ['contract_description'] },
                    ],
            
            raw:true,
            attributes: ['employing_status']
        })  
    }

    getWorkersByBranch_id =async(id)=> {
        return  await employing_details.findAll({
            include:[
                        {model:db.worker_branch,    
                            attributes: [] ,  
                            include:[{ model:db.worker,  attributes:['firstName','lastName']},     
                                     { model:db.active_request,  attributes:[],
                                          include:[{model:db.request_status,  attributes:['request_description']}]
                                     }],
                            where:{branchid:id}},                                                                                                              
                        {model:db.role,  attributes: ['role_name'] ,as :'role1'},
                        {model:db.role,  attributes: ['role_name']  ,as:'role2'}, 
                        {model:db.role,  attributes: ['role_name']  ,as:'role3'},  
                        {model:db.contract_status,  attributes: ['contract_description'] },
                    ],
            where:{
                employing_status: {in: [1,2]
                    },},
            raw:true,
            attributes:['employing_status'],           
        }); 
    }

    getManagers = async() => {
        return await manager.findAll();
    }
    
    getRoles = async() => {
        return await role.findAll();
    }
    
    getTraveling = async() => {
        return await traveling.findAll();
    }

//find by pk?? and not findall?
    getWorkerById  = async(id) => {
        return  await employing_details.findAll({
            include:[
                        {model:db.worker_branch,
                            attributes: ['id'] ,  
                            include:[{ model:db.worker,  attributes:['firstName','lastName','idnumberWorker','idworker']}],
                            where:{workerid:id}},                                                                             
                        {model:db.role,  attributes: ['role_name'] ,as :'role1'},
                        {model:db.role,  attributes: ['role_name']  ,as:'role2'}, 
                        {model:db.role,  attributes: ['role_name']  ,as:'role3'},
                        {model:db.employing_days,  attributes: ['day','fromhour','tohour'] },
                    ],
          // raw:true,
            attributes:['startdate','enddate','branchnumber'],           
        }); 
    }

    getWorkerByBranchId = async(id) => {
        return await worker_branch.findByPk(id);
    }



    postWorker = async(newWorker) => {
       console.log(newWorker);

        const  emp=employing_details.create(newWorker.employing_details);

        const work=worker.create(newWorker.worker_details);

        const hour=employing_days.create(newWorker.employing_hours);

        const wb=worker_branch.create(newWorker.worker_branch);
    
        return await emp,work,hour,wb;
        }

    updateWorker = async(id,workerToUpdate)=>{
        return employing_details.update(workerToUpdate, {
            where: {
                worker_branch_id: id 
                }    
          })
    }

    deleteWorker = async(id) => {
        return await worker.destroy({
            where: {
                idworker: id
                }
          })
    }

    deleteWorkerDetails = async(id) => {
        return await employing_details.destroy({
            where: {
                worker_branch_id: id
                }
          })
    }

}

const workerDatsAccessor = new WorkerDatsAccessor();

module.exports = workerDatsAccessor;