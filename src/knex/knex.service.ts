import { Injectable } from '@nestjs/common';
import * as Knex from 'knex';

@Injectable()
export class KnexService {
  private readonly knex: Knex;

  constructor(config: Knex.Config) {
    this.knex = Knex(config);
  }

  getKnex(): Knex {
    return this.knex;
  }
}