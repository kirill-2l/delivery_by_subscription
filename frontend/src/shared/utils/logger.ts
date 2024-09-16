import pino from 'pino';

const logger = pino({
  browser: {
    asObject: true,
    serialize: true,
  },
  formatters: {
    level(label, number) {
      return { level: number };
    },
  },
});

export { logger };
