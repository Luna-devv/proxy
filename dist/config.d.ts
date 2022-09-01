export declare const Config: ConfigType;
declare type ConfigType = {
    port: {
        http: number;
        proxy: number;
    };
    outTimeout: number;
    inTimeout: number;
};
export declare type Host = {
    target: number | string;
    type: "WEB" | "WS" | "REDIRECT";
    arc?: true | false;
    ip?: string;
    overwrites?: {
        path: string | string[];
        type: "WEB" | "REDIRECT";
        target: number | string;
        ip?: string;
    }[];
};
export {};
