// ------ Imports ------ //
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const joi = require('joi');
const nodemailer = require('nodemailer');
const app = express();

// ------ Guidelines ------ //
app.use('/static', (express.static(__dirname + '/static')));
app.use('/node_modules', (express.static(__dirname + '/node_modules')));
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
const transporter = nodemailer.createTransport({
    host: 'mail.111project.com',
    port: 465,
    secure: true,
    auth: {
        user: 'connect@111project.com',
        pass: '!Password12345'
    }
});


// ------ View Models ------ //
const churchSchema = joi.object().keys({
    'First Name': joi.string().required(),
    'Last Name': joi.string().required(),
    Email: joi.string().email().required(),
    Phone: joi.string().min(14).max(14).required(),
    Church: joi.string().required(),
    County: joi.string().required(),
    Pledge: joi.string().required()
});

const familySchema = joi.object().keys({
    'First Name': joi.string().required(),
    'Last Name': joi.string().required(),
    Email: joi.string().email().required(),
    Phone: joi.string().min(14).max(14).required(),
    Church: joi.string().required()
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

validateFamily = (data) => {
    const result = validate(data, familySchema);
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
        axios.get('https://sheetdb.io/api/v1/9gz8lpzh87ibs'),
        axios.get('https://sheetdb.io/api/v1/syduaraf3jz47/count'),
        axios.get('https://sheetdb.io/api/v1/9g94xd73wjuli/count'),
        axios.get('https://sheetdb.io/api/v1/mjo8imb1s0rfx'),
        axios.get('https://sheetdb.io/api/v1/syduaraf3jz47')
    ])
    .then(axios.spread((resources, stats, churchCount, familyCount, sponsors, churches) => {
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
            churchCount: churchCount.data.rows,
            familyCount: familyCount.data.rows,
            sponsorsData: sponsors.data,
            churchesData: churches.data,
            success: res.locals.success ? res.locals.success : null,
            errors: res.locals.errors ? res.locals.errors : null
        });
    }));
});

app.post('/churches', function (req, res) {
    console.log('hello world');
    if (validateChurch(req.body).length <= 1) {
        axios.post('https://sheetdb.io/api/v1/syduaraf3jz47', {
            data: {
                'First Name': req.body['First Name'],
                'Last Name': req.body['Last Name'],
                'Church': req.body['Church'],
                'Phone': req.body['Phone'],
                'Email': req.body['Email'],
                'County': req.body['County'],
                'Pledge': req.body['Pledge']
            }
        })
        .then(function (response) {})
        .catch(function (err) {
            console.log(err.response.data);
        });
        req.session.success = 'You successfully pledged your church to the campaign!';
    } else {
        req.session.errors = validateChurch(req.body);
    }
    res.redirect('/#church-form');
});

app.post('/families', function (req, res) {
    if (validateFamily(req.body).length <= 1) {
        axios.post('https://sheetdb.io/api/v1/9g94xd73wjuli', {
            data: {
                'First Name': req.body['First Name'],
                'Last Name': req.body['Last Name'],
                'Phone': req.body['Phone'],
                'Email': req.body['Email'],
                'Church': req.body['Church']
            }
        })
        .then(function (response) {})
        .catch(function (err) {
            console.log(err.response.data);
        });
        req.session.success = 'You successfully committed your family to the campaign!';
    } else {
        req.session.errors = validateFamily(req.body);
    }
    res.redirect('/#family-form');
});

app.post('/contact', function(req, res) {
    const mailOptions = {
        from: 'connect@111project.com',
        to: req.body.receiver,
        subject: 'More Than Enough - Contact Form',
        html:
            "<p>Hey - someone tried to contact you through the 111 Project - More Than Enough directory! Here is their info:</p>" +
            "<p><strong>Name: </strong>" + req.body.Name + "</p>" +
            "<p><strong>Phone: </strong>" + req.body.Phone + "</p>" +
            "<p><strong>Name: </strong>" + req.body.Email + "</p>" +
            "<p><strong>Message: </strong>" + req.body.Message + "</p>"
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        }
    });
    res.redirect('/');
});

app.post('/resources', function (req, res) {
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
            'Form Submitter First Name': req.body['Form Submitter First Name'],
            'Form Submitter Last Name': req.body['Form Submitter Last Name'],
            'Form Submitter Role': req.body['Form Submitter Role'],
            'Form Submitter Phone': req.body['Form Submitter Phone'],
            'Form Submitter Email': req.body['Form Submitter Email'],
            'Is Resource Champion?': (req.body['Is Resource Champion?'] === undefined ? 'No' : 'Yes'),
            'Champion First Name': req.body['Champion First Name'],
            'Champion Last Name': req.body['Champion Last Name'],
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
    res.redirect('/#resourceForm');
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