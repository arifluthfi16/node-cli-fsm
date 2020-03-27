#!/usr/bin/env node

// Variable Declaration & Import Module
const std_input = process.stdin;
const colors = require('colors');
var yargonaut = require('yargonaut')
const yargs = require('yargs');

const file = require('./file');

// Style Customization
yargonaut
.style('green')



// Command Stuff
yargs
    .usage("\nUsage : $0 <command> [options]")

    .command(
            'read-file', 
            'Read a give file and print it out',
            function(yargs){
                return yargs.option({
                    'file': {
                        alias: 'f',
                        desc : 'File name to read',
                        demandOption : true,
                        type: 'string'
                    }
                })
            },
            function(argv){
                file.readFile(argv.file);
            }
    )

    .command('get', 'make a get HTTP request', {
        url: {
        alias: 'u',
        default: 'http://yargs.js.org/'
        }
    })

    .command(
            'slope',
            'get slope for a certain degree',
            function (yargs) {
                return yargs.option({
                'url': {
                    alias: 'u',
                    default: 'http://yargs.js.org/'
                },
                'num' : {
                    alias : 'n',
                    type: 'number'
                }
            })
            .example("fsm slope -u http://google.com -n 13")
            },
            function (argv) {
                file.logIt(argv)
            }
        )
    .help()
    .alias('h','help')
    .argv