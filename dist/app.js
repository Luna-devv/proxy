"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const config_1 = require("./config");
const server_1 = require("./server");
server_1.proxy.on('error', server_1.onError);
node_http_1.default.createServer(server_1.requestManager).listen(config_1.Config.port.http, () => {
    console.log(`\x1b[33mHTTP (server) running on port ${config_1.Config.port.http}`);
    console.log(`\x1b[33mProxy (server) running on port ${config_1.Config.port.proxy}`);
});
//# sourceMappingURL=app.js.map