<h1 align="center">P R O X Y</h1>
Basic proxy script using <a href="https://github.com/http-party/node-http-proxy">http-proxy</a>, forked from <a href="https://github.com/flamexdev/proxy">flamexdev/proxy</a>.

## Setup
1. Clone this repository
2. Adapt the `config.json` to your usage
3. Run the script. E.g. `cd proxy && pm2 start src/index.js --name proxy` ([pm2](https://github.com/Unitech/pm2))

## Records
Go to [`src/hosts.js`](https://github.com/Luna-devv/proxy/blob/main/src/hosts.js), the key is the used (sub-)domain of the incoming request. <br />
There are two different types that you can use: `WEB` and `REDIRECT`:
- **"WEB"** Shows you the page that is running ont he port, that got specified with `target`
- **"REDIRECT"** Redirects the request to the URL, that got specified with `target`


## Any questions left?
Feel free to open a issue, send me an [E-Mail](mailto:luna@waya.one) or join my [Discord](https://waya.one/go/discord).
