"use strict";
const mysql = require('mysql2');
module.exports = function functionQuery(config, query, callback) {
    // TODO attivare database
    const connection = mysql.createConnection(config);
    connection.connect((connectionError) => {
        if (connectionError)
            throw connectionError;
        connection.query(query, (error, result) => {
            if (error)
                throw error;
            callback(result);
        });
    });
};
/*
sendQuery("
    SELECT field
    FROM table
  ", (result)=> res.status(200).json( {success:true, data:result} )
)

*/ 
