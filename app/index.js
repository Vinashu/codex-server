const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const imagePath = path.join(__dirname, '..','images/');
const NOT_FOUND = "not_found.png";
const app = express();

const {engine, Message} = require('./data.js')

app.use(bodyParser.json());
app.use("images", express.static(imagePath));

app.get('/api/engine', (req, res) => {
    console.log(req.method + "=>" + req.originalUrl);            
    res.json(engine.checkRewards(
        [
            new Message(
                "level",
                1
            ),
            new Message(
                "levels",
                10
            ),
            new Message(
                "points",
                150
            )
        ]
    ));
});

app.post('/api/engine', (req, res) => {
    // console.log(req.method + "=>" + req.originalUrl);            
    const messages = req.body.messages;
    if(messages) {
        res.json({'rewards': engine.checkRewards(messages)});
    } else {
        res.status(500).send('Missing messages body!')
    }
});

app.get('/images/:image', (req, res) => {
    const { image } = req.params;
    //Check if the image exists
    fs.access(imagePath + image, fs.F_OK, (err) => {
        if(err) {
            //Send the "not found" image
            res.sendFile(imagePath + NOT_FOUND);            
        } else {
            //Send the image
            res.sendFile(imagePath + image);
        }
    })
});

app.get('/api/test', (req, res) => {
    console.log(req.method + "=>" + req.originalUrl);        
    const test = {'variable': "Level", 'value': 1};
    res.json(test);
});

app.delete('/api/test', (req, res) => {
    console.log(req.method + "=>" + req.originalUrl);        
    const test = {'variable': "Level", 'value': 5};
    res.json(test);
});

app.post('/api/test', (req, res) => {
    console.log(req.method + "=>" + req.originalUrl);    
    console.log(req.body);
    res.redirect('/api/test');
});

app.put('/api/test', (req, res) => {
    console.log(req.method + "=>" + req.originalUrl);    
    console.log(req.body);
    res.redirect('/api/test');
});

app.use(function(req, res, next){
    console.log("404/" + req.method + "=>" + req.originalUrl);
    console.log(imagePath);
    res.status(404).send("We think you are lost :-/");
});

const HTTP_PORT = process.env.HTTP_PORT || 3000;

app.listen(HTTP_PORT, () => {
    console.log(`Listening at localhost:${HTTP_PORT}`);
});