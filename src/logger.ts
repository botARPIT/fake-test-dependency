import pino from 'pino';
import type { RequestHandler } from 'express';
import { randomUUID } from 'node:crypto'
import { pinoHttp } from 'pino-http';
import { config } from 'dotenv';
config()
const logger = pino(
	process.env.NODE_ENV === "production" ? {} : {
		transport: {
			target: 'pino-pretty',
			options: {
				colourize: true,
				translateTime: 'SYS:standard'
			}
		}
	})

const httpLogger: RequestHandler = pinoHttp({
	logger,
	genReqId: function (req, res) {
		return req.headers['x-request-id']?.toString() || randomUUID()
	},
	serializers: {
		req(req) {
			return {
				requestId: req.id,
				method: req.method,
				path: req.url
			}
		},
		res(res) {
			return {
				statuscode: res.statusCode
			}
		}
	}
})

export { logger, httpLogger }
