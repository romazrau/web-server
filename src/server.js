const { Person, me: tome } = require('./person');
const http = require('http');

const server = http.createServer((req, res)=> {
    res.writeHead(200, {
        'Content-Type': "text/html"
    })
    res.end(`<h2>Hi</h2>${tome}<p>123
    </p><p>${ (new Person("PJ")).toJSON() }</p>`);

})

server.listen(3000);




