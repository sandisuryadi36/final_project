//Script to list files inside portfolio directory
//and write the list inside JSON file

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

let directory = '../assets/portfolio'

//joining path of directory 
const directoryPath = path.join(__dirname, directory);

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file, i) {
        files[i] = "/assets/portfolio/" + file
    })

    let json = JSON.stringify(files)

    fs.writeFile('list.json', json, 'utf8', function () {
        console.log("JSON file successfully write")
    });
});