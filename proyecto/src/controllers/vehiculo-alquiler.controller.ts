import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculo,
  Alquiler,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoAlquilerController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alquiler)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Alquiler>,
  ): Promise<Alquiler[]> {
    return this.vehiculoRepository.alquilers(id).find(filter);
  }

  @post('/vehiculos/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Alquiler)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alquiler, {
            title: 'NewAlquilerInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) alquiler: Omit<Alquiler, 'id'>,
  ): Promise<Alquiler> {
    return this.vehiculoRepository.alquilers(id).create(alquiler);
  }

  @patch('/vehiculos/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Vehiculo.Alquiler PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alquiler, {partial: true}),
        },
      },
    })
    alquiler: Partial<Alquiler>,
    @param.query.object('where', getWhereSchemaFor(Alquiler)) where?: Where<Alquiler>,
  ): Promise<Count> {
    return this.vehiculoRepository.alquilers(id).patch(alquiler, where);
  }

  @del('/vehiculos/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Vehiculo.Alquiler DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Alquiler)) where?: Where<Alquiler>,
  ): Promise<Count> {
    return this.vehiculoRepository.alquilers(id).delete(where);
  }
}
