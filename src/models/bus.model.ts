import {Entity, model, property} from '@loopback/repository';

@model()
export class Bus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  number?: string;

  @property({
    type: 'string',
  })
  driver?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  place?: object[];


  constructor(data?: Partial<Bus>) {
    super(data);
  }
}

export interface BusRelations {
  // describe navigational properties here
}

export type BusWithRelations = Bus & BusRelations;
