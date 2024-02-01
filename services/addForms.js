
const fs = require('fs');


const createForms = ()=>{

        //תקיה לכל עובד בתוך תקית מסמכים
        const parentFolder = './parentFolder';
        const workerFolder = 'newFolder';

        const folderPath = `${parentFolder}/${workerFolder}`;

        if (fs.existsSync(folderPath)) {
            console.log(`Folder '${folderPath}' exists.`);
        } else {
            console.log(`Folder '${folderPath}' does not exist.`);
        }
        
        fs.mkdir(`${parentFolder}/${workerFolder}`, { recursive: true }, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('New folder created successfully!');
        }
        });

    }
    module.exports={createForms};