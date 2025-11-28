import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true,
  ignore: 'pid,hostname,level-label',
});

export const logger = pino(
  {
    base: undefined,
    level: process.env.LOG_LEVEL || 'info',
    mixin(_context, level, loggerInstance) {
      return { 'level-label': loggerInstance.levels.labels[level] };
    },
  },
  stream,
);

export const createLogger = (name: string) =>
  logger.child({ name }, { msgPrefix: `${name} ` });
