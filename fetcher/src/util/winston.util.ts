import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

const loggerFactory = (logtailToken: string) => {
  return WinstonModule.createLogger({
    level: 'debug', // The minimum level of messages to log.
    transports: [
      new transports.File({
        filename: 'application.log', // The filename of the logfile to write to
        dirname: 'logs', // The directory to save log files
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
      new transports.Console(),
      new LogtailTransport(new Logtail(logtailToken)),
    ],
  });
};

export default loggerFactory;
