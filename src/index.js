let converter = require('json-2-csv');
const fs = require('fs');

const jsonFile = require('../assets/test.json');

let json2csvCallback = function (err, csv) {
    if (err) throw err;
    fs.writeFile('csv/temp.csv', csv, function(err, data){
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
};

converter.json2csv(jsonFile, json2csvCallback);