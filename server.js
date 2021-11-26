const express = require('express');
const app = new express();
const router = require('./modules/routes')
app.use(express.json())
app.use(router)

app.listen(1000,()=>console.log('app run on port 1000'));