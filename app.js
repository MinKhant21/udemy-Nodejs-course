const http = require('http');

const express = require('express');
const adminRoute = require('./routes/admin')

const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(adminRoute)

app.use((req,res,next)=>{
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(3000,()=>{
    console.log('server Running 3000')
})
