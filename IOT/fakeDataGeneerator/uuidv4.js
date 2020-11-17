fs = require('fs');

fs.truncate('users.json', 0, function(){console.log('done')})
var stream = fs.createWriteStream("users.json", { flags: 'a' });

var text = fs.readFileSync("./sensorsids.json", "utf-8");
var textByLine = text.split("\n")

var opendata = JSON.parse(fs.readFileSync("./opendata.json", "utf-8")).features;
//console.log(opendata)

console.log(opendata.length)
for (let index = 0; index < 10000; index++) {
    if (opendata[index].geometry.type != "Point"){
        opendata.splice(index, 1);
    }
};

console.log(opendata.length)
last = "";
for (let index = 0; index < 10000; index++) {
    let addrs = opendata[index].properties.ADRES_VOIE_ID + " "+ opendata[index].properties.VOIE_NOMCOMPL+ " "+opendata[index].properties.ADRES_CODEPOST;
    if(last !== addrs){
        last = addrs;
        stream.write(
            JSON.stringify(
                {
                    "lat": opendata[index].geometry.coordinates[1], // float de latitude
                    "lon": opendata[index].geometry.coordinates[0], // float de longitude
                    "address": addrs, // adresse complete
                    "userID": uuidv4(), // UUIDV4
                    "sensorID": [textByLine[index]] // List permet de faire le lien avec l'autre table 
                }) + "\n"
        );
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
