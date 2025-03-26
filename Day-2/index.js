const http = require('http');

const port = 4000;

const resHeandal = (req, res) => {
    res.write(`<h1>Welcome to node js</h1>`)
    res.end('<b>This is my first Server</b>')
}

const server = http.createServer(resHeandal)

server.listen(port, (err) => {
    err ? console.log(err) : console.log(`server run port : ${port}`)
})