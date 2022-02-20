const httpProxy = require('http-proxy')
const request = require('request');
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


        if (arc) await arc.forEach((domain) => {
            if (`${req.headers.host}${req.url}`.startsWith(`${domain}/arc-sw.js`)) {
                res.writeHead(200, {
                    'Content-Type': 'application/javascript'
                })
                res.end('!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=93)}({3:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"g",(function(){return i})),n.d(e,"j",(function(){return a})),n.d(e,"i",(function(){return d})),n.d(e,"b",(function(){return f})),n.d(e,"k",(function(){return u})),n.d(e,"d",(function(){return p})),n.d(e,"e",(function(){return l})),n.d(e,"f",(function(){return m})),n.d(e,"h",(function(){return v}));var r={images:["bmp","jpeg","jpg","ttf","pict","svg","webp","eps","svgz","gif","png","ico","tif","tiff","bpg","avif","jxl"],video:["mp4","3gp","webm","mkv","flv","f4v","f4p","f4bogv","drc","avi","mov","qt","wmv","amv","mpg","mp2","mpeg","mpe","m2v","m4v","3g2","gifv","mpv","av1","ts","tsv","tsa","m2t","m3u8"],audio:["mid","midi","aac","aiff","flac","m4a","m4p","mp3","ogg","oga","mogg","opus","ra","rm","wav","webm","f4a","pat"],interchange:["json","yaml","xml","csv","toml","ini","bson","asn1","ubj"],archives:["jar","iso","tar","tgz","tbz2","tlz","gz","bz2","xz","lz","z","7z","apk","dmg","rar","lzma","txz","zip","zipx"],documents:["pdf","ps","doc","docx","ppt","pptx","xls","otf","xlsx"],other:["srt","swf"]},o=["js","cjs","mjs","css"],c="arc:",i={COMLINK_INIT:"".concat(c,"comlink:init"),NODE_ID:"".concat(c,":nodeId"),CLIENT_TEARDOWN:"".concat(c,"client:teardown"),CLIENT_TAB_ID:"".concat(c,"client:tabId"),CDN_CONFIG:"".concat(c,"cdn:config"),P2P_CLIENT_READY:"".concat(c,"cdn:ready"),STORED_FIDS:"".concat(c,"cdn:storedFids"),SW_HEALTH_CHECK:"".concat(c,"cdn:healthCheck"),WIDGET_CONFIG:"".concat(c,"widget:config"),WIDGET_INIT:"".concat(c,"widget:init"),WIDGET_UI_LOAD:"".concat(c,"widget:load"),BROKER_LOAD:"".concat(c,"broker:load"),RENDER_FILE:"".concat(c,"inlay:renderFile"),FILE_RENDERED:"".concat(c,"inlay:fileRendered")},a="serviceWorker",d="/".concat("shared-worker",".js"),f="/".concat("dedicated-worker",".js"),u="/".concat("arc-sw-core",".js"),s="".concat("arc-sw",".js"),p=("/".concat(s),"/".concat("arc-sw"),"arc-db"),l="key-val-store",m=2**17,v="".concat("https://warden.arc.io","/mailbox/propertySession");"".concat("https://warden.arc.io","/mailbox/transfers")},93:function(t,e,n){"use strict";n.r(e);var r=n(3);if("undefined"!=typeof ServiceWorkerGlobalScope){var o="https://arc.io"+r.k;importScripts(o)}else if("undefined"!=typeof SharedWorkerGlobalScope){var c="https://arc.io"+r.i;importScripts(c)}else if("undefined"!=typeof DedicatedWorkerGlobalScope){var i="https://arc.io"+r.b;importScripts(i)}}});')
                return
            }
        });

        // Return status code 404 if host is not a registered target
        console.log(req.headers.host);
        if (!hosts[req.headers.host]) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            return res.end(`
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
                    <meta name='viewport' content='width=device-width, initial-scale=0.8' />
                    <title>${req.headers.host === `161.129.154.146` ? `You found me (#_<-)` : `503 | ${req.headers.host}`}</title>
                </head>
                <body>
                    <div style="display: flex; justify-content: center; text-align: center; margin-top: 3rem;">
                        <div>
                            ${req.headers.host === `161.129.154.146` ? `
                            <div style="font-size: 4rem">Proxy server</div>
                            ` : `
                            <div style="font-size: 4rem">Service Unavailable</div>
                            `}
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; text-align: center; margin-top: 2rem;">
                        <main>
                            <div style="margin: 1rem">
                                <div style="font-size: 2.2rem; width: 90vw; max-width: 20rem">What happened?</div>
                                <content stlye="font-size: 1.8rem">
                                ${req.headers.host === `161.129.154.146` ? `
                                    You've requested an IP address that is part of the Waya network. <br />
                                    A valid Host header must be supplied to reach the desired website.
                                    ` : `
                                    You've requested a domain name which points to an IP address <br />
                                    that is part of the Waya network but no associated webserver could be found.
                                    `}
                                </content>
                            </div>
                            <br />
                            <div style="margin: 1rem">
                                <div style="font-size: 2.2rem; width: 90vw; max-width: 20rem;">${req.headers.host === `161.129.154.146` ? `How to setup?` : `How to resolve?`}</div>
                                <content stlye="font-size: 1.8rem">
                                    ${req.headers.host === `161.129.154.146` ? `
                                    Connect via SSH to <text>${req.headers.host}:22</text> and get started in <text>/root/luna/proxy/src/hosts.js</text>. <br />
                                    ` : `
                                    Connect to the server and get started in <text>/root/luna/proxy/src/hosts.js</text>. <br />
                                    `}
                                    The documentation can be found on GitHub at <a href='https://github.com/Luna-devv/proxy'>github.com/Luna-devv/proxy</a>. <br />
                                    If you don't know what you're doing at this point, please contact <a href="https://discord.com/users/821472922140803112">Luna</a>.
                                </content>
                            </div>
                        </main>
                    </div>
                </body>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
                    html {
                        font-family: 'Ubuntu', sans-serif;
                        background-color: #242029;
                        color: rgb(221, 217, 230);
                    }
                    text {
                        background-color: #131418;
                        color: #9fa2a7;
                        padding: 0.1rem 0.2rem 0.1rem 0.2rem;
                        border-radius: 0.2rem;
                        user-select: all;
                    }
                    a {
                        all: unset;
                        font-family: 'Open Sans', sans-serif;
                        color: #b671a7;
                        cursor: pointer;
                        transition-duration: 200ms;
                    }
                    a:hover {
                        color: #d99ecc;
                    }
                    main {
                        text-align: left;
                    }
                    content{
                        color: #aba8b3
                    }
                </style>
                </html>
                `);
        };

        // Get details about the registered target
        const { type, target } = hosts[req.headers.host]

        switch (type) {
            // Media requests
            case "MEDIA":
				request.get(`http://${target}`).pipe(res)
                break
			
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
