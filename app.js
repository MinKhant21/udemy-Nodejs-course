const http = require('http');

const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{
    console.log('one middleware!')
    next()
})
app.use('/users',(req,res,next)=>{
    console.log('two middleware!')
    res.send('<p>users</p>')
})


app.listen(3000,()=>{
    console.log('server Running 3000')
})
