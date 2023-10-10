require('dotenv').config()
import express from "express";
import engine from 'express-edge'
import adminRoute from './routes/admin'
import shopRoute from './routes/shop'
import BodyParser from 'body-parser'
import multer from "multer";
const app = express()

//body parser
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

const fileStoreage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images')
    },
    filename: (req,file,cb)=>{
        cb(null,new Date().toISOString() + '-' + file.originalname)
    }
})

app.use(multer({storage:fileStoreage}).single('image'))

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views/`);

app.use(express.static('public'))

app.use('/admin',adminRoute)
app.use(shopRoute)


// Configure view caching
app.enable('view cache');

app.listen(3000,()=>{
    console.log(`Server Running in 3000`)
})