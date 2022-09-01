export const Config: ConfigType = {
    port: {
        http: 80,
        proxy: 81
    },
    outTimeout: 30_000, // (in ms) for outgoing proxy requests
    inTimeout: 30_000, // (in ms) for incoming requests
};

type ConfigType = {
    port: {
        http: number
        proxy: number
    }
    outTimeout: number
    inTimeout: number
};

export type Host = {
    target: number | string
    type: "WEB" | "WS" | "REDIRECT"
    arc?: true | false
    ip?: string
    overwrites?: {
        path: string | string[]
        type: "WEB" | "REDIRECT"
        target: number | string
        ip?: string
    }[]
};