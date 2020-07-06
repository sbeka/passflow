import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Bus} from '../models';
import {BusRepository} from '../repositories';

export class BusController {
  constructor(
    @repository(BusRepository)
    public busRepository : BusRepository,
  ) {}

  @post('/buses', {
    responses: {
      '200': {
        description: 'Bus model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bus)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {
            title: 'NewBus',
            exclude: ['id'],
          }),
        },
      },
    })
    bus: Omit<Bus, 'id'>,
  ): Promise<Bus> {
    return this.busRepository.create(bus);
  }

  @get('/buses/count', {
    responses: {
      '200': {
        description: 'Bus model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Bus) where?: Where<Bus>,
  ): Promise<Count> {
    return this.busRepository.count(where);
  }

  @get('/buses', {
    responses: {
      '200': {
        description: 'Array of Bus model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Bus, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Bus) filter?: Filter<Bus>,
  ): Promise<Bus[]> {
    return this.busRepository.find(filter);
  }

  @patch('/buses', {
    responses: {
      '200': {
        description: 'Bus PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {partial: true}),
        },
      },
    })
    bus: Bus,
    @param.where(Bus) where?: Where<Bus>,
  ): Promise<Count> {
    return this.busRepository.updateAll(bus, where);
  }

  @get('/buses/{id}', {
    responses: {
      '200': {
        description: 'Bus model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Bus, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bus, {exclude: 'where'}) filter?: FilterExcludingWhere<Bus>
  ): Promise<Bus> {
    return this.busRepository.findById(id, filter);
  }

  @patch('/buses/{id}', {
    responses: {
      '204': {
        description: 'Bus PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bus, {partial: true}),
        },
      },
    })
    bus: Bus,
  ): Promise<void> {
    await this.busRepository.updateById(id, bus);
  }

  @put('/buses/{id}', {
    responses: {
      '204': {
        description: 'Bus PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bus: Bus,
  ): Promise<void> {
    await this.busRepository.replaceById(id, bus);
  }

  @del('/buses/{id}', {
    responses: {
      '204': {
        description: 'Bus DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.busRepository.deleteById(id);
  }
}
