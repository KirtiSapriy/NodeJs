const { log } = require("console");
const http = require("http");
const port = 2000;

const portHandle = (req, res) => {
    res.write("<h1>Welcome to node js</h1k>");//desplay message in screen
    res.end('<b><i><mark>Hello User</mark></i></b>')//end to loading server
}

const server = http.createServer(portHandle);//call portHandle function 
server.listen(port, (er) => {
    er ? console.log(er) : console.log(`started server port :${port}`);  // show outpu if server start then print message else print error
})