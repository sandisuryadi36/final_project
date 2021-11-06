//Script to list files inside portfolio directory
//and write the list inside JSON file

//requiring path and fs modules
const path = require('path')
const fs = require('fs')

let directory = '../assets/portfolio'
let jsonFile = {
    portrait: [],
    product: [],
}

//joining path of directory 
const directoryPath = path.join(__dirname, directory)

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err)
    }

    files.forEach(function (file, i) {
        if (file.match("portrait_")?.length != null) {
            jsonFile.portrait.push("/assets/portfolio/" + file)
        } else if (file.match("product_")?.length != null) {
            jsonFile.product.push("/assets/portfolio/" + file)
        }
    })

    let json = JSON.stringify(jsonFile)

    fs.writeFile('list.json', json, 'utf8', function () {
        console.log(jsonFile)
        console.log("\nScaned files:")
        console.log(jsonFile.portrait.length + " portrait files")
        console.log(jsonFile.product.length + " product files")
        console.log("\nJSON file successfully write")
    })
})