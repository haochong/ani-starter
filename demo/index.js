var http = require('http');
var fs=require('fs');
const PORT=3000;

function handleRequest(request, response){

    var file = './demo/index.html';

    if(request.url.indexOf('/dist/') > -1) {
        file = './'+request.url;
    }
    fs.readFile(file,function(error,data){
        if(error){
            response.writeHead(404,{"Content-type":"text/plain"});
            response.end("Sorry the page was not found");
        }else{
            var dotoffset = request.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                ? 'text/html'
                : {
                '.html' : 'text/html',
                '.ico' : 'image/x-icon',
                '.jpg' : 'image/jpeg',
                '.png' : 'image/png',
                '.gif' : 'image/gif',
                '.css' : 'text/css',
                '.js' : 'text/javascript'
                }[ request.url.substr(dotoffset) ];
            response.setHeader('Content-type' , mimetype);
            response.end(data);
        }
    });

}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});