const json2csv = require('json-2-csv');
const xlsx = require('xlsx');
const fs = require('fs');


//
// JSON 2 CSV
//


function jsonToCsv(file) {
    json2csv.json2csv(file, function (err, csv) {
        if (err) throw err;
        fs.writeFile('csv/temp.csv', csv, function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    });
}

// const jsonFile = require('../assets/test.json');
// jsonToCsv(jsonFile):


//
// EXCEL TO JSON
//
function xlsxToJSON(path) {
    const buffers = [];
    fs.createReadStream(path).on('error', (error) => {
        console.log(error);
    }).on('data', (chunk) => {
        buffers.push(chunk);
    }).on('end', () => {
        const buffer = Buffer.concat(buffers);
        const workbook = xlsx.read(buffer, { type: 'buffer', cellDates: true });
        const worksheet = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { raw: true });    
        fs.writeFile('json/temp.json',  JSON.stringify(worksheet), function (err, data) {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    });
}
xlsxToJSON('./assets/test.xlsx');
