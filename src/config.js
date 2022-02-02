module.exports = {
    ports: {
        proxyServer: 81,
        httpServer: 80
    },
    pattern: {
        ports: new RegExp('^[0-9]{1,5}$') // Valid ports
    },
    outTimeout: 30000, // (in ms) for outgoing proxy requests
    inTimeout: 30000, // (in ms) for incoming requests
    arc: [`waya.one`, `www.waya.one`, `tixte.waya.one`, `ptb.waya.one`]
}