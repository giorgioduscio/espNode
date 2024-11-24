const mysql =require('mysql2')

module.exports =function functionQuery(
  config:mysqlConfiguration, 
  query:string, 
  callback:Function,
){
  // TODO attivare database
  const connection =mysql.createConnection(config)
  
  connection.connect((connectionError:any)=>{
    if(connectionError) throw connectionError

    connection.query(query, (error:any, result:any)=>{
      if(error) throw error
      callback(result)
    })
  })
}
interface mysqlConfiguration{
  host:string,
  user:string,
  password:string,
  database:string,
}

/*
sendQuery("
    SELECT field
    FROM table
  ", (result)=> res.status(200).json( {success:true, data:result} )
)

*/