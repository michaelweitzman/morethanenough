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
mongoose.connect('mongodb://localhost/morethanenough');
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
    areServicesProvided: {type: Boolean},

    // 2. Form Submitter Info //
    submitterName: {type: String},
    submitterRole: {type: String},
    submitterPhone: {type: String},
    submitterEmail: {type: String},
    isChampion: {type: Boolean},

    // 3. Champion Info //
    championName: {type: String},
    championRole: {type: String},
    championPhone: {type: String},
    championEmail: {type: String},

    // 4. Descriptions //
    resourceDescription: {type: String},
    servicesProvided: {type: String},

    // 5. Miscellaneous //
    needVolunteers: {type: Boolean},
    canContact: {type: Boolean},
    gridAreas: [{type: String}],
    termsOfService: {type: Boolean},
    financialSupport: {type: Boolean}
}, {timestamps: true});
mongoose.model('Resource', ResourceSchema);
const Resource = mongoose.model('Resource');

// ------ CSV To JSON Data ------ //
csv().fromFile('data/report.csv')
.then( (json) => {
    console.log(json);
});

// ------ Routing ------ //
app.get('/', function(req, res) {
    res.render('index');
})

// ------ Server ------ //
app.listen(8000);
