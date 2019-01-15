// ------ Imports ------ //
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
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
    axios.all([
        axios.get('https://sheetdb.io/api/v1/fq10flbp4rpuu'),
        axios.get('https://sheetdb.io/api/v1/9gz8lpzh87ibs')
    ])
    .then(axios.spread( (resources, stats) => {
        res.render('index', {
            resourcesData: resources.data,
            statsData: stats.data
        });
    }));
});

app.post('/resources', function(req, res) {
    axios.post('https://sheetdb.io/api/v1/fq10flbp4rpuu', { data: {
            'Name': req.body['Name'],
            'Website': req.body['Website'],
            'Phone': req.body['Phone'],
            'Type': req.body['Type'],
            'Address One': req.body['Address One'],
            'Address Two': req.body['Address Two'],
            'City': req.body['City'],
            'State': req.body['State'],
            'Zip': req.body['Zip'],
            'Counties': multiSelectValues(req.body['Counties']),
            'Are Services Provided?': (req.body['Are Services Provided?'] === undefined ? 'No' : 'Yes'),
            'Form Submitter Name': req.body['Form Submitter Name'],
            'Form Submitter Role': req.body['Form Submitter Role'],
            'Form Submitter Phone': req.body['Form Submitter Phone'],
            'Form Submitter Email': req.body['Form Submitter Email'],
            'Is Resource Champion?': (req.body['Is Resource Champion?'] === undefined ? 'No' : 'Yes'),
            'Champion Name': req.body['Champion Name'],
            'Champion Role': req.body['Champion Role'],
            'Champion Phone': req.body['Champion Phone'],
            'Champion Email': req.body['Champion Email'],
            'Description': req.body['Description'],
            'Services Provided': req.body['Services Provided'],
            'Wants Volunteers?': (req.body['Wants Volunteers?'] === undefined ? 'No' : 'Yes'),
            'Open to Contact?': (req.body['Open to Contact?'] === undefined ? 'No' : 'Yes'),
            'Grid Areas': multiSelectValues(req.body['Grid Areas']),
            'Agrees to Terms of Service?': (req.body['Agrees to Terms of Service?'] === undefined ? 'No' : 'Yes'),
            'Wants to Support Financially?': (req.body['Wants to Support Financially?'] === undefined ? 'No' : 'Yes'),
        }})
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
    res.redirect('/#resourceForm');
});

app.post('/families', function(req, res) {
    axios.post('https://sheetdb.io/api/v1/9g94xd73wjuli', { data: {
            'Name': req.body['Name'],
            'Phone': req.body['Phone'],
            'Email': req.body['Email']
        }})
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        })
    res.redirect('#/familyForm');
});

// ------ Additional Methods ------ //
function multiSelectValues(list) {
    listString = '';
    if(Array.isArray(list)) {
        for(var i = 0; i < list.length; i++) {
            if(i === list.length - 1) {
                listString += ' ' + list[i];
            } else {
                listString += ' ' + list[i] + ',';
            }
        }
    } else {
        listString = list;
    }
    return listString;
}

// ------ Server ------ //
app.listen(8000);
