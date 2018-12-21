// ------ Imports ------ //
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const csv = require('csvtojson');
const app = express();

// ------ Guidelines ------ //
app.use([
    express.static(__dirname + '/static'),
    express.static(__dirname + '/node_modules')
]);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// ------ Routing ------ //
app.get('/', function(req, res) {
    csv().fromFile('data/report.csv')
    .then( (json) => {
        res.render('index', {data: json});
    });
});

app.post('/resources', function(req, res) {
    axios.post('https://sheetdb.io/api/v1/erhwv1m74gyik', { data: {
        // ---------- map out data object ---------- //
        }})
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
    res.redirect('/');
});

// ------ Server ------ //
app.listen(8000);
