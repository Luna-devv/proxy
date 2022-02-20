const express = require('express')
const app = express()
const fs = require("fs")
const { greenBright } = require("chalk")
const { ports, pattern } = require("./config.js")
const { server, handler } = require("./handler/proxyServer.js")
const onError = require("./handler/onError.js")

// Check for valid ports
if (!pattern.ports.test(ports.proxyServer)) throw new TypeError('The proxyServer port needs to be type of "number"')
if (!pattern.ports.test(ports.httpServer)) throw new TypeError('The httpServer port needs to be type of "number"')

// Register handler & start proxy server
server.on('error', onError)
app.use(handler);

app.listen(ports.httpServer, () => {
  console.log(greenBright(`HTTP is running on port ${ports.httpServer}`))
  console.log(greenBright(`Proxy is running on port ${ports.proxyServer}`))
})