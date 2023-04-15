import node_proxy from 'node:http';

import { Config } from './config';
import { http, ws, error, proxy } from './handlers';

proxy.on('error', error.send);
const server = node_proxy.createServer(http.handle);

server.on('upgrade', ws.handle);

server.listen(Config.port.http, () => {
    console.log(`\x1b[33mHTTP (server) running on port ${Config.port.http}\x1b[0m`);
    console.log(`\x1b[33mProxy (server) running on port ${Config.port.proxy}\x1b[0m`);
});