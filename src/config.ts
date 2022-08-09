export const Config = {
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
    onTimeout: number
    inTimeout: number
}