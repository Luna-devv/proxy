<h1 align="center">P R O X Y</h1>

Basic proxy script written in [node.js](https://nodejs.org) using [node:http](https://nodejs.org/api/http.html) and [node-http-proxy](https://github.com/http-party/node-http-proxy). <br />
This script was originally written from [@flamexdev](https://github.com/flamexdev/proxy) and was improved and re-written into [TypeScript](https://www.typescriptlang.org/) by me.

## Setup
1. Clone this repository using `git clone https://github.com/Luna-devv/proxy`
2. Adapt the [`src/hosts.ts`](https://github.com/Luna-devv/proxy/blob/main/src/hosts.ts) to your needs and webservers
3. Install all external dependencies using `npm install` or `yarn install`
4. Compile the code using `npx tsc` 
5. Run the script with [PM2](https://pm2.keymetrics.io/) `pm2 start dist/app.js --name proxy`

## Modify records
Example key for proxing a webserver:
```JSON
{
    "api.waya.one": {
        target: 4000,
        type: "WEB",
        arc: false
    }
}
```
### key ("api.waya.one")
This will be the subdomain or the domain that will be proxied.

### target
  - (using `"WEB"` or `WS`): This is the port on which your webserver runs. Please note that this musst run on the same server as this proxy script.
  - (using `"REDIRECT"`): This is the domain/IP the proxy script will redirect to. Note that this can be any domain, it must include the protocal (i.e. `"https://lunish.nl/luna"`)

### type
There are 3 essential types:
  - `"WEB"`: You will use this if you want that for example the content of the page `123.456.789:4000` should be displayed on `api.waya.one`.
  - `"WS"`: You will use this if you have a (server) websocket and you want i.e. to forward it from `123.456.789:4000` to `api.waya.one`.
  - `"REDIRECT"`: YOu will use this if you want to redirect the user to another page, this requires setting `target` to a string.

### arc
If your site is using [arc.io](https://arc.io/) you can just set this value to `true` to enable support for it. <br />
Note: All requests to `/arc-sw.js` will be catched by the proxy and will **NOT** reach your webserver.



## Any questions left?
Feel free to open a issue, send me an [E-Mail](mailto:luna@waya.one) or [join](https://lunish.nl/support) my Discord server.
