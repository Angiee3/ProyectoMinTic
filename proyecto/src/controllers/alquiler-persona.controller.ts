import {authenticate} from '@loopback/authentication';
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
  Persona,
} from '../models';
import {AlquilerRepository} from '../repositories';

export class AlquilerPersonaController {
  constructor(
    @repository(AlquilerRepository)
    public alquilerRepository: AlquilerRepository,
  ) { }

  @authenticate("asesor, admin")
  @get('/alquilers/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Alquiler.prototype.id,
  ): Promise<Persona> {
    return this.alquilerRepository.persona(id);
  }
}
