var userDB = require("../dal/user-accessor")
//להצפנת הסיסמא
const bcrypt= require('bcrypt')
//לשליחת מייל
const mailer = require('../services/sendEmails');
//להגרלת סיסמא
var generator = require('generate-password');
//token
const jwt= require('jsonwebtoken');



class UserController {

//קבלת פרטי כל משתמשים
   getAllUsers = async(req, res) =>{
        console.log("getAllUsers");
        userDB.getAllUsers()
        .then(data => {
            if (data){
                res.send(data);
            } 
            else {
              res.status(404).send({
                message: ` oh Cannot find users.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
              message: err.message || "Error retrieving users"
            });
          });
    }


    updateUser = async(req, res) =>{
        console.log("getAllUsers");
       await userDB.updateUser(1,req.body);
       res.send("ok")
    }
//קבלת פרטי משתמשים לסניף ספציפי
    getUserById = async(req, res) =>{
        var id = req.params.id;
       await userDB.getUserById(id)
       .then(data => {
        if (data){
            res.send(data);
        } 
        else {
          res.status(404).send({
            message: ` ah Cannot find users.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: err.message || "Error retrieving users"
        });
      });
        
    }



//הוספת משתמש
    postUser = async(req, res) =>{
        var userToAdd = req.body;
        //הצפנת הסיסמא
        const hashedPwd = await bcrypt.hash(userToAdd.password, 10);
        userToAdd.password=hashedPwd;
        await userDB.postUser(userToAdd)
        .then(data => {
            res.status(201).json({ message: 'enter user successfuly' })
          })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        });
    }

//הזדהות
    login = async (req, res) => {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(400).json({ message: 'All fields are required'});}
        const foundUser = await userDB.getUserById(userId);       
        if (!foundUser ) {
            //אולי לא לשלוח טעות???
            return res.status(401).json({ message: 'Unauthorized user' })
        }
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(401).json({ message: 'Unauthorized password' })
        res.send("Logged In");


       // ניצור אובייקט המכיל את הפרטים ללא הסיסמא
       //const userInfo = {password, ...foundUser}

    //    const userInfo= {
    //     id:foundUser.id,name:foundUser.name,
    //    roles:foundUser.roles, username:foundUser.username}

    //    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)

    //    res.json({accessToken:accessToken})

     }

        //יצירת סיסמא חדשה ושליחתה למייל
    newPassword = async (req, res) => {
        const foundUser = await userDB.getUserById(req.query.userId);
        if (!foundUser ) {
            return res.status(401).json({ message: 'Unauthorized user' })
        }
        //הגרלת סיסמא 
        var password = generator.generate({
            length: 4,
            numbers: true
        });
        // //הצפנת הסיסמא
        const hashedPwd = await bcrypt.hash(password, 10);
        foundUser.password=hashedPwd;
        foundUser.name="aaaaaaaaaaaa";
        console.log(foundUser.password);
        console.log(password)

        const to =foundUser.email;
        const subject = 'new password';
        const body = password;
       
        // mailer.sendEmail(to, subject, body)
        // .then(info => {
        //     console.log('Email sent: ', info.response);
        //     res.send('Registration successful');
        //     })
        // .catch(error => {
        //     console.log('Error sending email: ', error);
        //     res.status(500).send('Failed to send email');
        //     }); 
        await userDB.updateUser(req.query.userId,{password:hashedPwd});
        res.send("ok")

//token
   

        }
}


const userController = new UserController();

module.exports = userController;