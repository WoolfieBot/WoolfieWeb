const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/test', (req, res) => {
    res.render('test')
})

app.post('/test', (req, res) => {
    console.log(req.body)
})

app.listen(3000, () => console.log('Server started'))