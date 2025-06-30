const express = require('express');
const app = express();
const db = require('./configs/mongooseConnect');

const cookieParser = require('cookie-parser');
const path = require('path');

const ownerRouter = require('./routes/ownerRouter')
const usersRouter = require('./routes/usersRouters')
const productsRouter = require('./routes/productsRouter')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/owner', ownerRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)

app.listen(3000)