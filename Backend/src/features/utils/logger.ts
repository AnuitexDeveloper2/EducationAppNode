import  * as winston  from 'winston';

export let logger = new (winston.loggers)({
    exitOnError: false,
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'app.log'})
    ]
})

