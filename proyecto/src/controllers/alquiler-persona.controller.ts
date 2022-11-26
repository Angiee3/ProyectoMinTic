import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Alquiler,
  Persona
} from '../models';
import {AlquilerRepository} from '../repositories';

export class AlquilerPersonaController {
  constructor(
    @repository(AlquilerRepository)
    public alquilerRepository: AlquilerRepository,
  ) { }

  //@authenticate("asesor, admin")
  @get('/alquilers/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Alquiler.prototype.id,
  ): Promise<Persona> {
    return this.alquilerRepository.persona(id);
  }
}
