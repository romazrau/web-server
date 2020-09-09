const { Person, me: tome } = require('./person');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {

    fs.writeFile(__dirname + "/header01.txt" , JSON.stringify(req.headers) , (error)=>{
        if(error){
            return console.log(error);
        };

        res.writeHead(200, {
            'Content-Type': "text/html"
        })
        res.end(`<h2>Hi</h2>${tome}<p>123
        </p><p>${ (new Person("PJ")).toJSON() }</p>`);
    
    } )


})

server.listen(3000);




