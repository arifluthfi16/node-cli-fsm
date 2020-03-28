#!/usr/bin/env node

// Variable Declaration & Import Module
const colors = require('colors');
var yargonaut = require('yargonaut')
const yargs = require('yargs');
const sql = require('./src/sql');
const file = require('./src/file');

// Style Customization
yargonaut
.style('red')

// Pre Define some common options

const options = {
    file : {
        alias: 'f',
        desc : 'File name',
        demandOption : true,
        type: 'string'
    },
    dir : {
        alias : 'd',
        desc  : 'Directory name',
        demandOption : true,
        type : 'string'
    },
    username : {
        alias : 'u',
        desc  : 'username',
        demandOption : true,
        type : 'string'
    },
    email : {
        alias : 'e',
        desc  : 'email',
        demandOption : true,
        type : 'string'
    }
}


// Command Stuff
yargs
    .usage("\nUsage : fsm <command> [options]")

    .scriptName('fsm')

    // File working
    .command(
        'read-file', 
        'Read a give file and print it out',
        function(yargs){
            return yargs.option({
                'file': options.file
            })
        },
        function(argv){
            file.readFile(argv.file);
        }
    )

    .command(
        'write-file',
        'Write a file in current dir with data input',
        function(yargs){
            return yargs.option({
                'file': options.file,
                'data': {
                    alias:'d',
                    desc : 'Data input',
                    demandOption : true,
                    type : 'string'
                }
            })
            .example("fsm write-file -f abcd.txt -d \"the data\"","Write a new file called abcd.txt with text \"the data\"")
        },
        function(argv){
            file.writeFile(argv.file,argv.data);
        }
    )

    .command(
        'delete-file',
        'Delete a file in current dir',
        function(yargs){
            return yargs.option({
                'file': options.file,
            })
            .example("fsm delete-file -f abcd.txt")
        },
        function(argv){
            file.deleteFile(argv.file);
        }
    )

    .command(
        'rename-file',
        'Rename a file in current dir',
        function(yargs){
            return yargs.option({
                'file': options.file,
                'newName' : {
                    alias : 'n',
                    desc : 'New file name',
                    demandOption : true,
                    type: 'string'
                }
            }).example('fsm rename-file -f new.txt -n old.txt', 'Rename a file from new.txt to old.txt')
        },
        function(argv){
            file.renameFile(argv.file, argv.newName);
        }
    )

    .command(
        'create-dir',
        'Create a new directory',
        function(yargs){
            return yargs.option({
                'dir': options.dir,
            })
            .example("fsm create-dir -d foo","Create a new directory with the name foo")
        },
        function(argv){
            file.createDir(argv.dir);
        }
    )

    .command(
        'delete-dir',
        'Delete a directory',
        function(yargs){
            return yargs.option({
                'dir':options.dir
            })
            .example('fsm delete-dir -d foo',"Delete a directory with the name foo")
        },
        function(argv){
            file.delDir(argv.dir);
        }
    )

    .command(
        'rename-dir',
        'Rename a directory',
        function(yargs){
            return yargs.option({
                'dir': options.dir,
                'newName' : {
                    alias : 'n',
                    desc : 'New dir name',
                    demandOption : true,
                    type: 'string'
                } 
            }).example('fsm rename-dir -d foo -n faa',"Rename directory foo into faa")
        }, 
        function(argv){
            file.renameDir(argv.dir,argv.newName);
        }
    )

    // SQL Working
    .command(
        'show-table',
        '[SQL]'.green+' Show all table in sampledb',
        function(yargs){
            return yargs.option({
                
            })
        },
        function(argv){
            sql.showTable();
        }

    )

    .command(
        'create-user',
        '[SQL]'.green+' Create a new user',
        function(yargs){
            return yargs.option({
                'username' : options.username,
                'email'    : options.email,
                'type'     : {
                    alias : 't',
                    demandOption : false,
                    desc : 'Type of user',
                    type : 'boolean'
                }
            })
        },
        function(argv){
            sql.createNewUser(argv.username,argv.email,argv.type);
        }
    )

    .command(
        'create-type',
        '[SQL]'.green+' Create a new user type',
        function(yargs){
            return yargs.option({
                'typename'     : {
                    alias : 't',
                    demandOption : false,
                    desc : 'Name of new type',
                    type : 'string'
                }
            })
        },
        function(argv){
            sql.createNewUserType(argv.typename);
        }
    )

    .command(
        'read-user',
        '[SQL]'.green+' Read user data by username',
        function(yargs){
            return yargs.option({
                'username' : options.username
            })
        },
        function(argv){
            sql.readUserByUsername(argv.username);
        }
    )

    .command(
        'delete-user',
        '[SQL]'.green+' Delete user data by the username',
        function(yargs){
            return yargs.option({
                'username' : options.username
            })
        },
        function(argv){
            sql.deleteByUsername(argv.username);
        }
    )

    .command(
        'update-email',
        '[SQL]'.green+' Delete user email by the username',
        function(yargs){
            return yargs.option({
                'username' : options.username,
                'newemail' : options.email
            })
        },
        function(argv){
            sql.updateEmailByUsername(argv.username,argv.newemail);
        }
    )
    
    


    .help()
    .alias('h','help')
    .example("fsm read-file -h","Check read-file command details")
    .argv