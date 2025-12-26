import pino from 'pino';
import type { RequestHandler } from 'express';
declare const logger: pino.Logger<never, boolean>;
declare const httpLogger: RequestHandler;
export { logger, httpLogger };
//# sourceMappingURL=logger.d.ts.map