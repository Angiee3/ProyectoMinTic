import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Alquiler,
  Vehiculo
} from '../models';
import {AlquilerRepository} from '../repositories';

export class AlquilerVehiculoController {
  constructor(
    @repository(AlquilerRepository)
    public alquilerRepository: AlquilerRepository,
  ) { }

  @authenticate("asesor, admin")
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
