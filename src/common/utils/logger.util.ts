import { Logger } from '@nestjs/common';

export class CustomLogger extends Logger {
  error(message: string, trace: string) {
    // Add custom error logging logic here
    super.error(message, trace);
  }

  warn(message: string) {
    // Add custom warn logging logic here
    super.warn(message);
  }

  log(message: string) {
    // Add custom info logging logic here
    super.log(message);
  }

  debug(message: string) {
    // Add custom debug logging logic here
    super.debug(message);
  }
}