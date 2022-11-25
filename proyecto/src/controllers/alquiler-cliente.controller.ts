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
  Cliente,
} from '../models';
import {AlquilerRepository} from '../repositories';

export class AlquilerClienteController {
  constructor(
    @repository(AlquilerRepository)
    public alquilerRepository: AlquilerRepository,
  ) { }

  @get('/alquilers/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Alquiler.prototype.id,
  ): Promise<Cliente> {
    return this.alquilerRepository.cliente(id);
  }
}
