// @ts-ignore
const express =require('express')
const app =express()
const port = 3000
const usersRouter =require('./datas/usersRouter')
const studentsRouter =require('./datas/studentsRouter')
const pagesRouter =require('./pages/pagesRouter')

app.use('/',pagesRouter)
app.use('/api/students',studentsRouter)

app.listen(port,()=> console.log(`http://localhost:${3000}\n\n`))