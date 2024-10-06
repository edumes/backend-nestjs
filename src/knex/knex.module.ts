import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexService } from './knex.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: KnexService,
      useFactory: (configService: ConfigService) => {
        return new KnexService(configService.get('knex'));
      },
      inject: [ConfigService],
    },
  ],
  exports: [KnexService],
})
export class KnexModule {}