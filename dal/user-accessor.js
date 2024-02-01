
const db =require('../models/index')
const user= db.user;

class UserDatsAccessor {

    getAllUsers = async() => {
        console.log("getAllUsers");
        return await user.findAll();
    }
    
    getUserById = async(id) => {
        return  await user.findByPk(id);
    }
    
    postUser = async(userToAdd) => {
        return await user.create(userToAdd);        
    }

    findUserByName = async(username) =>{
            return await user.findOne({where:{name:username}})
    }
    updateUser = async(id,userToUpdate)=>{
        console.log(userToUpdate.password);
      console.log(id);
  
        return user.update(userToUpdate, {
            where: {
                idusers: id 
                }    
          })
    }
   
}


const userDatsAccessor = new UserDatsAccessor();

module.exports = userDatsAccessor;