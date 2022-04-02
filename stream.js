let fs  = require('fs');

let inputFile = './users.json'
let outputFile = './out.json'

let readable = fs.createReadStream(inputFile)
let writeable = fs.createWriteStream(outputFile)

readable.pipe(writeable)