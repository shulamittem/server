const db =require('../models/index')
const request= db.active_request;

class RequestDatsAccessor {

    getAllRequests = async() => {
        return await request.findAll();
    }
    
    addRequest = async(requestToAdd) => {
        return  await request.create(requestToAdd);
    }
    
    getRequestsByIdCopy = async(id,status) => {
        return await request.findAll({
            include:[{model:db.request_type ,  attributes: ['request_type'] },
           {model:db.request_status ,  attributes: ['request_description'] }
           ,
          
        ],
        raw:true,
            where:{worker_branchid:id,
        //    request_statusid:status
        }
        });
            }
            getRequestsById = async(id) => {
                return await request.findAll({
                    include:[{model:db.request_type ,  attributes: ['request_type'] },
                   {model:db.request_status ,  attributes: ['request_description'] }
                   ,
                  
                ],
                raw:true,
                    where:{worker_branchid:id,
               
                }
                });
                    }

    updateRequest = async(id,requestToUpdate)=>{
            return request.update(requestToUpdate, {
                where: {
                    idactive_request: id 
                    }    
            })
        }           
    
    deleteRequest = async(id) => {
        await  request.destroy({
            where: {
               idactive_request: id
            }
          })
    }

}


const requestDatsAccessor = new RequestDatsAccessor();

module.exports = requestDatsAccessor;