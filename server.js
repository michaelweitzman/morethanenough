// ------ Imports ------ //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const joi = require('joi');
const app = express();

// ------ Guidelines ------ //
app.use([
    express.static(__dirname + '/static'),
    express.static(__dirname + '/node_modules')
]);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true 
}));
app.use(session({
    secret: 'secretword',
    resave: false,
    saveUninitialized: false
}));


// ------ View Models ------ //
const churchSchema = joi.object().keys({
    Name: joi.string().required(),
    Email: joi.string().email().required(),
    Phone: joi.string().min(14).max(14).required(),
    Church: joi.string().required()
});

const resourceSchema = joi.object().keys({
    Name: joi.string().required(),
    Website: joi.string().required(),
    Phone: joi.string().min(14).max(14).required(),
    // Type: ,
    'Address One': joi.string().required(),
    'Address Two': joi.string(),
    City: joi.string().required(),
    State: joi.string().required(),
    Zip: joi.string().required(),
    // Counties: ,
    // 'Are Services Provided?': ,
    'Form Submitter Name': joi.string().required(),
    'Form Submitter Role': joi.string().required(),
    'Form Submitter Phone': joi.string().min(14).max(14).required(),
    'Form Submitter Email': joi.string().email().required(),
    // 'Is Resource Champion?'; ,
    'Champion Name': joi.string().required(),
    'Champion Role': joi.string().required(),
    'Champion Phone': joi.string().min(14).max(14).required(),
    'Champion Email': joi.string().email().required(),
    'Description': joi.string().required(),
    'Services Provided': joi.string().required(),
    // 'Wants Volunteers?': ,
    // 'Open to Contact?',
    // 'Grid Areas': ,
    // 'Agrees to Terms of Service?': ,
    // 'Wants to Support Financially?':
});

validate = (data, schema) => {
    const result = (joi.validate(data, schema, {abortEarly: false}));
    if (result.error) {
        const errors = result.error.details;
        let messages = [];
        for (const error of errors) {
            messages.push({
                [error.context.label]: error.message
            });
        }
        return messages;
    }
}

validateChurch = (data) => {
    const result = validate(data, churchSchema);
    if (result) {
        return result;
    } else {
        return 'valid';
    }
}

validateResource = (data) => {
    const result = validate(data, resourceSchema);
    if (result) {
        return result;
    } else {
        return 'valid';
    }
}

// ------ Routing ------ //
app.get('/', function (req, res) {
    axios.all([
        axios.get('https://sheetdb.io/api/v1/fq10flbp4rpuu'),
        axios.get('https://sheetdb.io/api/v1/9gz8lpzh87ibs')
    ])
    .then(axios.spread((resources, stats) => {
        if (req.session.errors) {
            res.locals.errors = req.session.errors;
        }
        if (req.session.success) {
            res.locals.success = req.session.success;
        }
        req.session.destroy();
        res.render('index', {
            resourcesData: resources.data,
            statsData: stats.data,
            success: res.locals.success ? res.locals.success : null,
            errors: res.locals.errors ? res.locals.errors : null
        });
    }));
});

app.post('/resources', function (req, res) {
    if (validateResource(req.body).length <= 1) {
        axios.post('https://sheetdb.io/api/v1/fq10flbp4rpuu', {
            data: {
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
            }
        })
        .then(function (response) {})
        .catch(function (err) {
            console.log(err);
        });
        req.session.success = 'You successfully committed your ' + req.body['Type'] + 'to the campaign!';
    } else {
        req.session.errors = validateResource(req.body);
    }
    res.redirect('/#resourceForm');
});

app.post('/families', function (req, res) {
    if (validateChurch(req.body).length <= 1) {
        axios.post('https://sheetdb.io/api/v1/9g94xd73wjuli', {
            data: {
                'Name': req.body['Name'],
                'Phone': req.body['Phone'],
                'Email': req.body['Email']
            }
        })
        .then(function (response) {})
        .catch(function (err) {
            console.log(err.response.data);
        });
        req.session.success = 'You successfully committed your church to the campaign!';
    } else {
        req.session.errors = validateChurch(req.body);
    }
    res.redirect('/#family-form');
});

// ------ Server Logic ------ //
function multiSelectValues(list) {
    listString = '';
    if (Array.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
            if (i === list.length - 1) {
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