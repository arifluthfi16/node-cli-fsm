#!/usr/bin/env node

// Variable Declaration & Import Module
const colors = require('colors');
var yargonaut = require('yargonaut')
const yargs = require('yargs');

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


    .help()
    .alias('h','help')
    .example("fsm read-file -h","Check read-file command details")
    .argv