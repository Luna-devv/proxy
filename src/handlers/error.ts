import node_proxy, { Server } from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { Socket } from 'node:net';

export function send(err: Error | string, req: node_proxy.IncomingMessage, res: node_proxy.ServerResponse | Socket, e?: any) {
    if (!res) return;
    try {
        (res as node_proxy.ServerResponse).writeHead?.(500, {
            'Content-Type': 'text/html'
        });
        const html_500 = fs.readFileSync(`${process.cwd()}/html/500.html`, 'utf-8')
        return res.end(html_500.replace(/{host}/g, req.headers.host || ''));
    } catch { return };
};