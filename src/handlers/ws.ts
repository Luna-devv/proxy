import node_proxy from 'node:http';
import { Socket } from 'node:net';

import { proxy } from '.';
import { Host } from '../config';
import hosts from '../hosts';

export async function handle(req: node_proxy.IncomingMessage, socket: Socket, head: Buffer) {

    const { ip, target } = hosts[req.headers.host || ''] as Host;
    if (!target) return;

    proxy.ws(req, socket, head, {
        target: `http://${ip || '127.0.0.1'}:${target}`
    });

};