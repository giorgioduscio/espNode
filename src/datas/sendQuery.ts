const mysql =require('mysql2')

module.exports =function sendQuery(
  config:mysqlConfiguration, 
  query:string, 
  callback:Function,
){
  // TODO ricorda: prima occorre attivare il database
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