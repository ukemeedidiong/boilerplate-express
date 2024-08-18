let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config()


app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=> {
    const logmessage =  `${req.method} ${req.path} - ${req.ip}`;
    console.log(logmessage);
    next();
});

app.use('/public', express.static(__dirname + '/public'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
    const messageStyles = process.env.MESSAGE_STYLE;
    let responseMessage = { "message": "Hello json" };

    if (messageStyles === "uppercase"){
        responseMessage.message = responseMessage.message.toUpperCase();
    }
    res.json(responseMessage);
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time})
});

app.get('/:word/echo', function(req, res) {
    const word = req.params.word;
    res.json({echo: word});
});

app.get('/name', function(req, res) {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({name: `${firstName} ${lastName}`});
});

app.post('/name', function(req, res) {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({name: `${firstName} ${lastName}`});
});

app.listen(3000, () => {
    console.log('server listening at port 3000');
});


































 module.exports = app;
