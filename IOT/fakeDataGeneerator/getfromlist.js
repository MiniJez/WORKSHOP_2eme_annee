fs = require('fs');

var text = fs.readFileSync("./users.json", "utf-8");
var textByLine = text.split("\n")
var stream = fs.createWriteStream("sensorsids.json", { flags: 'a' });
var tot =0;
textByLine.forEach(element => {
    var element = JSON.parse(element);
    console.log(element.sensorID[0]);
    stream.write(element.sensorID[0] + "\n");
    tot++
});
console.log(tot);