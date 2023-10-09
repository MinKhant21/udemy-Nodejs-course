require('dotenv').config()
import express from "express";
import engine from 'express-edge'
import adminRoute from './routes/admin'
import shopRoute from './routes/shop'

const app = express()

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views/`);

// Configure view caching
app.enable('view cache');
app.use(express.static('public'))
app.use('/admin',adminRoute)
app.use(shopRoute)

app.listen(3000,()=>{
    console.log(`Server Running in 3000`)
})