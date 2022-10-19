import http_proxy from 'http-proxy';
import fs from 'node:fs';
import path from 'node:path';

import { Errors } from './errors';
import { Config, Host } from './config';
import hosts from './hosts';

export const proxy = http_proxy.createProxyServer({
    proxyTimeout: Config.outTimeout,
    timeout: Config.inTimeout,
    ws: true
}).listen(Config.port.proxy);

export async function requestManager(req, res) {

    // Return success for uptime bots
    if (req.url === '/__http_proxy_status') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        return res.end(JSON.stringify({ success: true }));
    };

    // Return error if host isn't congifured
    if (!hosts[req.headers.host]) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        const html_404 = fs.readFileSync(path.join(__dirname, '../html/404.html'), 'utf-8')
        return res.end(html_404.replace(/{host}/g, req.headers.host));
    };

    // Get details about the registered target
    const { type, target, arc, ip, overwrites } = hosts[req.headers.host] as Host;

    // Enables support for arc.io
    if (arc && req.url === '/arc-sw.js') {
        res.writeHead(200, {
            'Content-Type': 'application/javascript'
        })
        return res.end('!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=93)}({3:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"g",(function(){return i})),n.d(e,"j",(function(){return a})),n.d(e,"i",(function(){return d})),n.d(e,"b",(function(){return f})),n.d(e,"k",(function(){return u})),n.d(e,"d",(function(){return p})),n.d(e,"e",(function(){return l})),n.d(e,"f",(function(){return m})),n.d(e,"h",(function(){return v}));var r={images:["bmp","jpeg","jpg","ttf","pict","svg","webp","eps","svgz","gif","png","ico","tif","tiff","bpg","avif","jxl"],video:["mp4","3gp","webm","mkv","flv","f4v","f4p","f4bogv","drc","avi","mov","qt","wmv","amv","mpg","mp2","mpeg","mpe","m2v","m4v","3g2","gifv","mpv","av1","ts","tsv","tsa","m2t","m3u8"],audio:["mid","midi","aac","aiff","flac","m4a","m4p","mp3","ogg","oga","mogg","opus","ra","rm","wav","webm","f4a","pat"],interchange:["json","yaml","xml","csv","toml","ini","bson","asn1","ubj"],archives:["jar","iso","tar","tgz","tbz2","tlz","gz","bz2","xz","lz","z","7z","apk","dmg","rar","lzma","txz","zip","zipx"],documents:["pdf","ps","doc","docx","ppt","pptx","xls","otf","xlsx"],other:["srt","swf"]},o=["js","cjs","mjs","css"],c="arc:",i={COMLINK_INIT:"".concat(c,"comlink:init"),NODE_ID:"".concat(c,":nodeId"),CLIENT_TEARDOWN:"".concat(c,"client:teardown"),CLIENT_TAB_ID:"".concat(c,"client:tabId"),CDN_CONFIG:"".concat(c,"cdn:config"),P2P_CLIENT_READY:"".concat(c,"cdn:ready"),STORED_FIDS:"".concat(c,"cdn:storedFids"),SW_HEALTH_CHECK:"".concat(c,"cdn:healthCheck"),WIDGET_CONFIG:"".concat(c,"widget:config"),WIDGET_INIT:"".concat(c,"widget:init"),WIDGET_UI_LOAD:"".concat(c,"widget:load"),BROKER_LOAD:"".concat(c,"broker:load"),RENDER_FILE:"".concat(c,"inlay:renderFile"),FILE_RENDERED:"".concat(c,"inlay:fileRendered")},a="serviceWorker",d="/".concat("shared-worker",".js"),f="/".concat("dedicated-worker",".js"),u="/".concat("arc-sw-core",".js"),s="".concat("arc-sw",".js"),p=("/".concat(s),"/".concat("arc-sw"),"arc-db"),l="key-val-store",m=2**17,v="".concat("https://warden.arc.io","/mailbox/propertySession");"".concat("https://warden.arc.io","/mailbox/transfers")},93:function(t,e,n){"use strict";n.r(e);var r=n(3);if("undefined"!=typeof ServiceWorkerGlobalScope){var o="https://arc.io"+r.k;importScripts(o)}else if("undefined"!=typeof SharedWorkerGlobalScope){var c="https://arc.io"+r.i;importScripts(c)}else if("undefined"!=typeof DedicatedWorkerGlobalScope){var i="https://arc.io"+r.b;importScripts(i)}}});')
    };

    // managing overwrites
    if (overwrites) {
        for (const overwrite of overwrites) {

            if (
                (typeof overwrite.path === 'string' ? (req.url.includes('?') ? req.url.split('?')[0] : req.url) == overwrite.path : overwrite.path.includes(req.url.includes('?') ? req.url.split('?')[0] : req.url))
                || (typeof overwrite.path === 'string' && overwrite.path.endsWith('/*') && (req.url.includes('?') ? req.url.split('?')[0] : req.url).startsWith(overwrite.path.slice(0, -1)))
                || overwrite.path === '/*'
            ) {

                // Proxy overwrite
                switch (overwrite.type) {
                    // HTTP requests
                    case "WEB":
                        if (typeof overwrite.target !== 'number') return process.emitWarning(Errors.INVALID_TYPE.replace('![[INVALID_TYPE]]', typeof overwrite.target), 'INVALID_TYPE');

                        proxy.web(req, res, {
                            target: `http://${overwrite.ip || '127.0.0.1'}:${overwrite.target}`
                        });
                        break;

                    case "REDIRECT":
                        if (typeof overwrite.target !== 'string') return process.emitWarning(Errors.INVALID_TYPE.replace('![[INVALID_TYPE]]', typeof overwrite.target), 'INVALID_TYPE');
                        if (overwrite.target.includes('{path}')) process.emitWarning(Errors.PLACEHOLDER_DEPRECATION.replace('![[DEPRICATED_PLACEHOLDER]]', '{path}').replace('![[NEW_PLACHOLDER]]', '{total_path}'), 'DeprecationWarning');

                        // Redirections
                        if (typeof overwrite.target === 'number') return onError('Redirect target cannot be number', req, res);
                        res.writeHead(302, {
                            'Location': overwrite.target
                                .replace(/{after_path}/g, (req.url.includes('?') ? req.url.split('?')[0] : req.url).split(overwrite.path.slice(0, -1))[1])
                                .replace(/{total_path}/g, (req.url.includes('?') ? req.url.split('?')[0] : req.url).slice(1))
                                .replace(/{query}/g, req.url.split('?')[1] ? `?${req.url.split('?')[1]}` : '')

                                .replace(/{path}/g, (req.url.includes('?') ? req.url.split('?')[0] : req.url).slice(1))
                        });
                        res.end();
                        break;

                    default:
                        /**
                         * Error!
                         * Non-existent overwrite.target type
                         */
                        res.writeHead(502);
                        res.end();
                        break;
                };

                return;
            };
        };
    };

    // Proxy domain
    switch (type) {
        // HTTP requests
        case "WEB":
            if (typeof target !== 'number') return process.emitWarning(Errors.INVALID_TYPE.replace('![[INVALID_TYPE]]', typeof target), 'INVALID_TYPE');

            proxy.web(req, res, {
                target: `http://${ip || '127.0.0.1'}:${target}`
            });
            break;

        // WebSocket requests
        case "WS":
            if (typeof target !== 'number') return process.emitWarning(Errors.INVALID_TYPE.replace('![[INVALID_TYPE]]', typeof target), 'INVALID_TYPE');

            proxy.ws(req, res.socket, {
                target: `ws://${ip || '127.0.0.1'}:${target}`
            });
            break;

        // Redirections
        case "REDIRECT":
            if (typeof target !== 'string') return process.emitWarning(Errors.INVALID_TYPE.replace('![[INVALID_TYPE]]', typeof target), 'INVALID_TYPE');

            res.writeHead(302, {
                'Location': target
            });
            res.end();
            break;

        default:
            /**
             * Error!
             * Non-existent target type
             */
            res.writeHead(502);
            res.end();
            break;
    };
};

export async function onError(err, req, res) {
    if (!res) return;
    try {
        res.writeHead(500, {
            'Content-Type': 'text/html'
        });
        const html_500 = fs.readFileSync(path.join(__dirname, '../html/500.html'), 'utf-8')
        return res.end(html_500.replace(/{host}/g, req.headers.host));
    } catch { return };
};