const express = require('express');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const engine = require('express-edge')
const path = require('path');

const app = express();

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))

app.use('/admin/',adminRoute)
app.use(shopRoute)

app.use((req,res,next)=>{
    res.status(404).render('404')
})

app.listen(3000,()=>{
    console.log('server Running 3000')
})
