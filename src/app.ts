import http from 'node:http';

import { Config } from './config';
import { requestManager, proxy, onError } from './server';

proxy.on('error', onError);
http.createServer(requestManager).listen(Config.port.http, () => {
    console.log(`\x1b[33mHTTP (server) running on port ${Config.port.http}\x1b[0m`);
    console.log(`\x1b[33mProxy (server) running on port ${Config.port.proxy}\x1b[0m`);
});