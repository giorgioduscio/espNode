const express =require('express')
,     app =express()
,     usersRouter =require('./datas/usersRouter')
// ,     pagesRouter =require('./app/pages/pagesRouter')


app.use('/api/users',usersRouter)
// app.use('/',pagesRouter)


app.listen(3000,I=> console.log('http://localhost:3000\n\n'))