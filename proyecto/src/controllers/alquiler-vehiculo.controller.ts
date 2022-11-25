import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Alquiler,
  Vehiculo,
} from '../models';
import {AlquilerRepository} from '../repositories';

export class AlquilerVehiculoController {
  constructor(
    @repository(AlquilerRepository)
    public alquilerRepository: AlquilerRepository,
  ) { }

  @get('/alquilers/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Alquiler.prototype.id,
  ): Promise<Vehiculo> {
    return this.alquilerRepository.vehiculo(id);
  }
}
