import mysql from "mysql2" //importare mysql

//const mysql = require("mysql2");
// inizializziamo una costanteconnection a mysql.createConnection({})
const connection = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database")
})

console.log("host:" + process.env.DB_HOST)
export default connection //esportiamo la costante connection