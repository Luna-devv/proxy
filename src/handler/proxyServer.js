const httpProxy = require('http-proxy')
const hosts = require("../hosts.js")
const { ports, outTimeout, inTimeout, arc } = require("../config.js")
const { readFileSync, writeFileSync } = require("fs")

const proxy = httpProxy.createProxyServer({
    proxyTimeout: outTimeout,
    timeout: inTimeout,
    ws: true
}).listen(ports.proxyServer)

module.exports = {
    server: proxy,
    handler: async (req, res, head) => {

        // if (req.headers.waya_proxy_api_request = true) {

        //     res.setHeader('Access-Control-Allow-Origin', '*')
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH')
        //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, waya_proxy_api_request')
        //     res.setHeader('Access-Control-Allow-Credentials', true)

        //     switch (req.url) {
        //         case `/setup`:
        //             if (req.method === `PATCH`) {

        //                 let body = ''
        //                 req.on('data', async (chunk) => {
        //                     body = await JSON.parse(chunk.toString())
        //                 })
        //                 req.on('end', () => {
        //                     console.log(body.name)
        //                     if (!body?.name || !body?.icon) {
        //                         res.writeHead(400, { error: `Invalid body` })
        //                         res.end()
        //                     }
        //                     let configFile = require(`../dashboard.json`)
        //                     configFile.name = body.name.replace(/</, `&lt;`).replace(/>/, `&gt;`);
        //                     configFile.icon = body.icon;
        //                     writeFileSync(`${__dirname}/../dashboard.json`, JSON.stringify(configFile));
        //                     res.writeHead(204)
        //                 })
        //                 return
        //             } else {
        //                 res.writeHead(502)
        //                 res.end()
        //             }
        //             break
        //         default:
        //             /*
        //             * Error!
        //             * API Route does not exist
        //             */
        //             res.writeHead(502)
        //             res.end()
        //             break
        //     }
        //     return
        // }

        if (arc) await arc.forEach((domain) => {
            if (`${req.headers.host}${req.url}` === `${domain}/arc-sw.js`) {
                res.writeHead(302, {
                    'Location': "https://arc.io/arc-sw.js"
                });
                res.end();
                return
            }
        });

        // proxy:
        // Return status code 404 if host is not a registered target
        if (!hosts[req.headers.host]) {
            res.writeHead(404)
            return res.end()
        }

        // Get details about the registered target
        const { type, target } = hosts[req.headers.host]

        switch (type) {
            // HTTP requests
            case "WEB":
                proxy.web(req, res, {
                    target: `http://127.0.0.1:${target}`
                })
                break

            case "WS":
                // WebSocket requests
                proxy.ws(req, res.socket, head, {
                    target: `ws://127.0.0.1:${target}`
                })
                break

            case "REDIRECT":
                // Redirections
                res.writeHead(302, {
                    'Location': target
                })
                res.end()
                break

            default:
                /**
                 * Error!
                 * Non-existent target type
                 */
                res.writeHead(502)
                res.end()
                break
        }
    }
}
