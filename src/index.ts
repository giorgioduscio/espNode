// @ts-nocheck
const express =require('express')
const path =require('path')
const app =express()
const port = 3000

const usersRouter =require('./datas/usersRouter')
const studentsRouter =require('./datas/studentsRouter')
const pagesRouter =require('./pages/pagesRouter')

// pug setup
const pagesDirectory =path.join('C:/Users/Giorno Giovanna/Desktop/Programmazione/espNode/src/pages')
require('./pages/routes').forEach(item=>{
  let selectDirectory =item.filePath.split('/')[0]
  let pageDir =path.join(pagesDirectory, selectDirectory)  
  app.set('views', pageDir)
  app.use(express.static(pageDir))
})
app.set('view engine', 'pug')

// routers
app.use('/', pagesRouter)
app.use('/api/students', studentsRouter)

app.listen(port,()=> console.log(`http://localhost:${3000}\n\n`))
