const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const imagePath = path.join(__dirname, '..','images/');
const NOT_FOUND = "not_found.png";
const app = express();

app.use(bodyParser.json());
app.use("images", express.static(imagePath));

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
    const test = {_id: 1, desc: 'success'};
    res.json(test);
});

app.post('api/test', (req, res) => {
    const { data } = req.body;
    res.redirect('api/test');
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