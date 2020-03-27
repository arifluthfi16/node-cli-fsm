const fs = require('fs');

// Read file
function readFile(filename){
    fs.readFile(filename,'utf-8', function(err,file){
        if(err) {
            console.log("Failed to open file")
            return;
        }
        console.log(file)
    })
}

function writeFile(filename, data){

}

function deleteFile(filename){

}

function renameFile(filename,newName){

}

function createDir(dirname){

}

function moveDir(dirname, newLocation){

}

function delDir(dirname){

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
    moveDir,
    delDir,
    logIt
}