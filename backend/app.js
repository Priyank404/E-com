const express = require('express');
const app = express();
const cors = require('cors');
const expressSession = require('express-session');
const flash = require('connect-flash');
const db = require('./config/mongooseConnect');

require('dotenv').config();

const cookieParser = require('cookie-parser');
const path = require('path');

const ownerRouter = require('./routes/ownerRouter')
const usersRouter = require('./routes/usersRouters')
const productsRouter = require('./routes/productsRouter');
const shop = require('./routes/shop');
const checkAuth = require('./routes/checkAuth');


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true               
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash())




app.use('/owner', ownerRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/shop',shop)
app.use('/check', checkAuth)





app.listen(3000,()=>{
    console.log("server is running on 3000")
})