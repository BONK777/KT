const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3003;

var data;

fs.readFile('data.json', (err, fileData) => {
    data = JSON.parse(fileData)
});

http.createServer((req, res) => {
    var reqpath = req.url.toString().split('?')[0];
    if (reqpath.split('.')[1] === 'jpg') {
        res.writeHead(200, {'Content-Type': 'image/jpeg', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'origin, content-type, accept'});
        const img = fs.readFileSync('file:///' + reqpath);
        res.write(img);
        res.end();

    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<meta charset="UTF-8">`)
        for (let { title, src} of data) {
            res.write(`<div class="title">${title}</div>`)
            res.write(`<img class="image" src=${__dirname + '/' + src} />`)
        }
        res.end();
    }
    
}).listen(PORT);