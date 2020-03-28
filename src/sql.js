const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'sampledb'
})

function showTable(){
    connection.connect(function(err){
        if(err) throw err;
        console.log("Connected");
    
        connection.query("show tables",(err,res)=>{
            if(err) throw err;
            console.log(res);
            connection.end(()=>{
                console.log("Connection closed!");
            })
            return;
        });
    });
}

function createNewUser(username,email, usertype=1){
    connection.connect(function(err){
        if(err) throw err;
        let sql = `insert into users (username,email,type) values('${username}','${email}',${usertype})`;
        connection.query(sql, (err,res)=>{
            if(err) throw err;
            console.log("Successfully created a new user");
            connection.end();
            return;
        })
    })
}

function readUserByUsername(username){
    connection.connect(function(err){
        if(err) throw err;
        let sql = `select * from users where username='${username}'`;
        connection.query(sql, (err,res)=>{
            if(err) throw err;
            console.log(res);
            connection.end();
            return;
        })
    })
}

function updateEmailByUsername(username, email){
    connection.connect(function(err){
        if(err) throw err;
        let sql = `update users set email='${email}' where username='${username}'`;
        connection.query(sql, (err,res)=>{
            if(err) throw err;
            console.log("Successfully update an user email");
            connection.end();
            return;
        })
    })
}

function deleteByUsername(username){
    connection.connect(function(err){
        if(err) throw err;
        let sql = `delete from users where username='${username}'`
        connection.query(sql, (err,res)=>{
            if(err) throw err;
            console.log("Successfully delete user by username");
            connection.end();
            return;
        })
    })
}

function createNewUserType(typename){
    connection.connect(function(err){
        if(err) throw err;
        let sql = `insert into user_type (type_name) values ('${typename}')`;
        console.log("SQL : "+sql)
        connection.query(sql, (err,res)=>{
            if(err) throw err;
            console.log("Succesfully created new user type!");
            connection.end();
            return;
        })
    })
}

module.exports = {
    showTable,
    createNewUser,
    createNewUserType,
    readUserByUsername,
    updateEmailByUsername,
    deleteByUsername
}