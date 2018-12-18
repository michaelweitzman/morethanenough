// ------ Imports ------ //
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

// ------ Database ------ //
mongoose.connect('mongodb://localhost/morethanenough', {useNewUrlParser: true});
const ResourceSchema = new mongoose.Schema({
    // 1. Resource Info //
    resourceName: {type: String},
    resourceWebsite: {type: String},
    resourcePhone: {type: String},
    resourceAddressOne: {type: String},
    resourceAddressTwo: {type: String},
    resourceCity: {type: String},
    resourceState: {type: String},
    resourceZip: {type: String},
    resourceCounties: [{type: String}],
    resourceType: {type: String},
    areServicesProvided: {type: Boolean, default: false},

    // 2. Form Submitter Info //
    submitterName: {type: String},
    submitterRole: {type: String},
    submitterPhone: {type: String},
    submitterEmail: {type: String},
    isChampion: {type: Boolean, default: true},

    // 3. Champion Info //
    championName: {type: String},
    championRole: {type: String},
    championPhone: {type: String},
    championEmail: {type: String},

    // 4. Descriptions //
    resourceDescription: {type: String},
    servicesProvided: {type: String},

    // 5. Miscellaneous //
    needVolunteers: {type: Boolean, default: false},
    canContact: {type: Boolean, default: true},
    gridAreas: [{type: String}],
    termsOfService: {type: Boolean, default: false},
    financialSupport: {type: Boolean, default: false}
}, {timestamps: true});
mongoose.model('Resource', ResourceSchema);
const Resource = mongoose.model('Resource');

// ------ Routing ------ //
app.get('/', function(req, res) {
    csv().fromFile('data/report.csv')
    .then( (json) => {
        res.render('index', {data: json});
    });
});

app.post('/resources', function(req, res) {
    const resource = new Resource({
        resourceName: req.body.resourceName,
        resourceWebsite: req.body.resourceWebsite,
        resourcePhone: req.body.resourcePhone,
        resourceType: req.body.resourceType,
        resourceAddressOne: req.body.resourceAddressOne,
        resourceAddressTwo: req.body.resourceAddressTwo,
        resourceCity: req.body.resourceCity,
        resourceState: req.body.resourceState,
        resourceZip: req.body.resourceZip,
        resourceCounties: req.body.resourceCounties,
        areServicesProvided: (req.body.areServicesProvided === 'on' ? true : false),
        submitterName: req.body.submitterName,
        submitterRole: req.body.submitterRole,
        submitterPhone: req.body.submitterPhone,
        submitterEmail: req.body.submitterEmail,
        isChampion: (req.body.isChampion === 'on' ? true : false),
        championName: req.body.championName,
        championRole: req.body.championRole,
        championPhone: req.body.championPhone,
        championEmail: req.body.championEmail,
        resourceDescription: req.body.resourceDescription,
        servicesProvided: req.body.servicesProvided,
        needVolunteers: (req.body.needVolunteers === 'on' ? true : false),
        canContact: (req.body.canContact === 'on' ? true : false),
        gridAreas: req.body.gridAreas,
        termsOfService: (req.body.termsOfService === 'on' ? true : false),
        financialSupport: (req.body.financialSupport === 'on' ? true : false)
    });
    resource.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('successful resource post');
        }
    });
    res.redirect('/');
});

// ------ Server ------ //
app.listen(8000);
