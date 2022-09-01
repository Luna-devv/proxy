<h1 align="center">P R O X Y</h1>

[![](https://img.shields.io/discord/828676951023550495?color=5865F2&logo=discord&logoColor=white)](https://lunish.nl/support)
![](https://img.shields.io/github/downloads/Luna-devv/proxy/total)

Basic proxy script written in [node.js](https://nodejs.org) using [node:http](https://nodejs.org/api/http.html) and [node-http-proxy](https://github.com/http-party/node-http-proxy). <br />
This script was originally written from [@flamexdev](https://github.com/flamexdev/proxy) and was improved and re-written into [TypeScript](https://www.typescriptlang.org/) by me.

## Setup
1. Clone this repository using `git clone https://github.com/Luna-devv/proxy`
2. Adapt the [`src/hosts.ts`](https://github.com/Luna-devv/proxy/blob/main/src/hosts.ts) to your needs and webservers
3. Install all external dependencies using `npm install` or `yarn install`
4. Compile the code using `npx tsc` 
5. Run the script with [PM2](https://pm2.keymetrics.io/) `pm2 start dist/app.js --name proxy`

## Modify records
Example object for proxing a webserver:
```ts
{
    "proxy.local": {
        target: 3000,
        type: "WEB"
    }
}
```
### key ("proxy.local")
This value can only be a [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), this key is required. <br />
This will be the subdomain (`subdomain.proxy.local`) or the domain (`proxy.local`) that will be managed.

### target
This value can only be a [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), this key is required. <br />
  - (using `"WEB"` or `"WS"`): This is the port on which your webserver runs. Please note that this musst run on the same server as this proxy script.
  - (using `"REDIRECT"`): This is the domain/IP the proxy script will redirect to. Note that this can be any domain, it must include the protocal (i.e. `"https://lunish.nl/luna"`)

### type
This value can only be `WEB`, `WS` or `REDIRECT`, this key is required. <br />
There are 3 essential types:
  - `"WEB"`: You will use this if you want that for example the content of the page `123.456.789:4000` should be displayed on `api.waya.one`.
  - `"WS"`: You will use this if you have a (server) websocket and you want i.e. to forward it from `123.456.789:4000` to `api.waya.one`.
  - `"REDIRECT"`: YOu will use this if you want to redirect the user to another page, this requires setting `target` to a string.

## Additional entries
If you want to do more complex stuff with the proxy, you can do that too. <br />
Here is an example object with *all* possible configurations:
```ts
"proxy.local": {
    target: 3000,
    type: "WEB",
    arc: true,
    ip: '127.0.9.1',
    overwrites: [
        {
            path: ['/sex', '/sex2'],
            target: 'https://google.com',
            type: "REDIRECT"
        }
    ]
}
```

### arc
This value can only be `true` or `false`, this key is optional. <br />
If your site is using [arc.io](https://arc.io/) you can just set this value to `true` to enable support for it. <br />
Note: All requests to `/arc-sw.js` will be catched by the proxy and will **NOT** reach your webserver.

### ip
This value can only be a [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), this key is optional. <br />
By default, this script will proxy using the local [`127.0.0.1`](https://www.google.co.jp/search?q=127.0.0.1) IP. If you use docker or generally want to proxy domains for different servers, you can simply change this value to any other IP address.

### overwrites
This value can only be a [Overwrites Array](#overwrites.path), this key is optional. <br />
Overwrites are made to redirect or proxy only specific parts (routes) of the domain and not the whole domain at once.

### overwrites.path
This value can only be a [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or a [String Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#create_an_array), this key is required inside of [`overwrites`](#overwrites). <br />
This will represent the path(s) that will be overwritten. It can be either one (a String) or multiple (an Array) like in the example object above. <br />
Note: All requests to this/these path(s) will be catched by the proxy and will **NOT** reach your webserver.

### overwrites.target
This value can only be a [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), this key is required inside of [`overwrites`](#overwrites). <br />
For more reference please go to [#target](#target).

### overwrites.type
This value can only be `WEB` or `REDIRECT`, this key is required inside of [`overwrites`](#overwrites). <br />
For more reference please go to [#type](#type). <br />
Note: `WS` (websockets) aren't supported as overwrite.

## Modify error pages
If you want to to change the error pages for either a missing record ([`404.html`](https://github.com/Luna-devv/proxy/blob/main/html/404.html)) or the page for a not responding webserver ([`500.html`](https://github.com/Luna-devv/proxy/blob/main/html/500.html)), go to the [`/html/`](https://github.com/Luna-devv/proxy/tree/main/html) file tree and start editing your plain HTML pages there. <br />
Note: There is a `{hosts}` placeholder that will be replaced with the requested domain (i.e.: `proxy.local`)

## Any questions left?
Feel free to open a issue, send me an [E-Mail](mailto:luna@waya.one) or [join](https://lunish.nl/support) my Discord server.
