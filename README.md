<h1 align="center">P R O X Y</h1>

[![](https://img.shields.io/discord/828676951023550495?color=5865F2&logo=discord&logoColor=white)](https://lunish.nl/support)
![](https://img.shields.io/github/downloads/Luna-devv/proxy/total)

Basic proxy script written in [node.js](https://nodejs.org) using [node:http](https://nodejs.org/api/http.html) and [node-http-proxy](https://github.com/http-party/node-http-proxy). <br />
This script was originally written from [@flamexdev](https://github.com/flamexdev/proxy) and was improved and re-written into [TypeScript](https://www.typescriptlang.org/) by me. <br>
A full walk trough can be found on [this GitHub's Wiki](https://github.com/Luna-devv/proxy/wiki).

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

## Anything else
**Please read the wiki at https://github.com/Luna-devv/proxy/wiki**

## Any questions left?
Feel free to open a issue, send me an [E-Mail](mailto:luna@waya.one) or [join](https://lunish.nl/support) my Discord server.
