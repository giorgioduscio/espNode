const express =require('express')
,     app =express()
,     usersRouter =require('./routes/users')


app.use('/api/users',usersRouter)

app.listen(3000,I=> console.log('http://localhost:3000\n\n'))