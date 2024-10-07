"use strict";
// @ts-ignore
const express = require('express'), app = express(), port = 3000, usersRouter = require('./datas/usersRouter');
app.use('/api/users', usersRouter);
app.listen(port, () => console.log(`http://localhost:${3000}\n\n`));
