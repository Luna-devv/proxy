export default {
    "api.waya.one": {
        target: 4000,
        type: "WEB",
        arc: false
    },

    "whois.waya.one": {
        target: 4001,
        type: "WEB",
        arc: false
    },

    "lunish.gay": {
        target: 5000,
        type: "WEB",
        arc: true
    },
    "www.lunish.gay": {
        target: 5000,
        type: "WEB",
        arc: true
    },

    "lunish.nl": {
        target: 5001,
        type: "WEB",
        arc: true
    },
    "www.lunish.nl": {
        target: 5001,
        type: "WEB",
        arc: true
    },
    "c.lunish.nl": {
        target: 'https://lunish.nl/luna',
        type: "REDIRECT",
        overwrites: [
            {
                path: '/*',
                type: "REDIRECT",
                target: 'https://cdn.waya.one/{path}'
            }
        ]
    },

    "waya.one": {
        target: 5000,
        type: "WEB",
        arc: true
    },
    "www.waya.one": {
        target: 5000,
        type: "WEB",
        arc: true
    },


    "proxy.local": {
        target: 3000,
        type: "WEB",
        arc: true,
        ip: '127.0.9.1',
        overwrites: [
            {
                path: ['/sex'],
                type: "REDIRECT",
                target: 'https://google.com/{path}'
            }
        ]
    }

}