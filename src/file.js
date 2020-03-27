const fs = require('fs');
const path = './'

// Read file
function readFile(filename){
    fs.readFile(path+filename,'utf-8', function(err,file){
        if(err) {
            console.log("Failed to open file");
            return;
        }
        console.log(file)
    })
}

function writeFile(filename, data){
    fs.writeFile(path+filename,data,(err)=>{
        if(err){
            console.log("Failed to write file");
            return;
        }
        console.log("File saved!")
    })
}

function deleteFile(filename){
    fs.unlink(path+filename, (err)=>{
        if(err){
            console.log("Failed to delete file");
            return;
        }
        console.log("File with the name "+filename+" sucessfully deleted");
    })
}

function renameFile(filename,newName){
    fs.rename(path+filename,path+newName,(err)=>{
        if(err){
            console.log("Error when renaming file");
            return;
        }
        console.log("successfully renamed a file!");
    })
}

function createDir(dirname){
    fs.mkdir(path+dirname, { recursive: true }, (err) => {
        if (err) {
            console.log("Failed to create a dir");
            return;
        }
        console.log("Successfully created a new dir")
      });
}

function renameDir(dirname, newName){
    fs.rename(dirname,newName,(err)=>{
        if(err){
            console.log("Error when renaming a directory");
            return;
        }
        console.log("successfully renamed a directory!");
    })
}

function delDir(dirname){
    fs.rmdir(dirname, (err)=>{
        if(err){
            console.log("Failed to delete directory");
            return;
        }
        console.log("Directory deleted!");
    })
}

function logIt(stuff){
    console.log("THE STUUUUUUUUUUUUUUUF YO")
}

module.exports = {
    readFile,
    writeFile,
    deleteFile,
    renameFile,
    createDir,
    renameDir,
    delDir,
    logIt
}