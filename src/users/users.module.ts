import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { KnexModule } from '../knex/knex.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), KnexModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}