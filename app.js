require('dotenv').config()
import express from "express";
import engine from 'express-edge'
import adminRoute from './routes/admin'
import shopRoute from './routes/shop'
import BodyParser from 'body-parser'
import multer from "multer";
import crypto from 'crypto'

const app = express()

//body parser
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

const fileStoreage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/images')
    },
    filename: (req,file,cb)=>{
        cb(null,crypto.randomUUID() + '-' + file.originalname)
    }
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/png')
        cb(null,true)
    else
        cb(null,false)
}

app.use(multer({storage:fileStoreage,fileFilter:fileFilter}).single('image'))

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