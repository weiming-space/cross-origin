const express = require('express');
const url = require('url');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next){
    let pathname = url.parse(req.url).pathname;

    if(pathname === '/'){
        res.sendFile(path.resolve(__dirname, '../src/jsonp.html'));
    }else if(pathname.indexOf('.') > 0){
        res.sendFile(path.resolve(__dirname, '../src' + pathname));
    }else{
        next();
    }
});

// app.get('/ajax.js', function(req, res){
//     res.sendFile(path.resolve(__dirname, '../src/ajax.js'));
// });

//JSONP ====================================
app.get('/jsonp', function(req, res){
    var urlObj = url.parse(req.url, true),
        callbackName = urlObj.query.callback,
        data = {
            errno : 0,
            msg: 'ok',
            data: {
                text: 'jsonp!'
            }
        };

    res.send(callbackName+'('+JSON.stringify(data)+')');
});


//CORS =======================================
app.get('/cors', function(req, res){
    var urlObj = url.parse(req.url, true),
        callbackName = urlObj.query.callback,
        data = {
            errno : 0,
            msg: 'ok',
            data: {
                text: 'cors!'
            }
        };
    res.setHeader('Access-Control-Allow-origin', '*');
    res.send(data);
});

//agency ======================================
app.post('/addUser', function(req, res){
    var urlObj = url.parse(req.url, true),
        proxy = req.body.proxy;

    res.redirect(proxy+'?username='+req.body.username);
});



app.listen(8080);
