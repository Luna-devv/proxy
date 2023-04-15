import node_proxy from 'http-proxy';
import { Config } from '../config';

export const proxy = node_proxy.createProxyServer({
    proxyTimeout: Config.outTimeout,
    timeout: Config.inTimeout,
    ws: true
}).listen(Config.port.proxy);

export * as error from './error';
export * as http from './http';
export * as ws from './ws';