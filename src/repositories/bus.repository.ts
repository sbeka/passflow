import {DefaultCrudRepository} from '@loopback/repository';
import {Bus, BusRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BusRepository extends DefaultCrudRepository<
  Bus,
  typeof Bus.prototype.id,
  BusRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Bus, dataSource);
  }
}
