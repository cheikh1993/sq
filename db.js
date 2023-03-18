const mysql = require("mysql")
require("dotenv").config()
 const db = mysql.createPool({
    host:     process.env.DB_HOST,
    port: 3306,
    user:            process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.getConnection((err, conn) => {
    if(err){
        console.log(err);

    }else{
            console.log("Connecte avec succes...");
    }

})

module.exports = db
    