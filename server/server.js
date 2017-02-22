const connect = require('connect');
const serveStatic = require('serve-static');
const port = 5858
connect().use(serveStatic('./bin')).listen(port, function(){
    console.log(`Server running on ${port}...`);
});