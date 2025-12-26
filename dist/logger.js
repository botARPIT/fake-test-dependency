import pino from 'pino';
import { randomUUID } from 'node:crypto';
import { pinoHttp } from 'pino-http';
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colourize: true,
            translateTime: 'SYS:standard'
        }
    }
});
const httpLogger = pinoHttp({
    logger,
    genReqId: function (req, res) {
        return req.headers['x-request-id']?.toString() || randomUUID();
    },
    serializers: {
        req(req) {
            return {
                requestId: req.id,
                method: req.method,
                path: req.url
            };
        },
        res(res) {
            return {
                statuscode: res.statusCode
            };
        }
    }
});
export { logger, httpLogger };
//# sourceMappingURL=logger.js.map