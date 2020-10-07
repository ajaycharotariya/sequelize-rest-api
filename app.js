const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/index')
var indexRouter = require('./routes/index');
var path = require('path');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('App listening on port 3000')
})