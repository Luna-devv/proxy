<h1 align="center">P R O X Y</h1>
Basic proxy script using <a href="https://github.com/http-party/node-http-proxy">http-proxy</a>

## Setup
1. Clone this repository
2. Adapt the `config.json` to your usage
3. Run the script. E.g. `cd proxy && pm2 start index.js --name proxy` ([pm2](https://github.com/Unitech/pm2))

__Inline command example for Linux__:<br>
`git clone https://github.com/flamexdev/proxy.git && cd proxy && pm2 start index.js --name proxy`

## Modify records
Go to `config.json`. There you can see an example for https://waya.one.

The key is the used (sub-)domain of the incoming request. 
There are two different types that you can use: `WEB` and `REDIRECT`:
- "WEB"
Shows you the page that is running ont he port, that got specified with `target`

- "REDIRECT"
Redirects the request to the URL, that got specified with `target`


## Any questions left?
Feel free to open a issue, send me an [E-Mail](mailto:luna@waya.one) or a dm on [Discord](https://discord.com/users/821472922140803112)
