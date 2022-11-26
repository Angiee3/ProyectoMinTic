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
  Persona,
  Alquiler,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaAlquilerController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Array of Persona has many Alquiler',
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
    return this.personaRepository.alquilers(id).find(filter);
  }

  @post('/personas/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Alquiler)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alquiler, {
            title: 'NewAlquilerInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) alquiler: Omit<Alquiler, 'id'>,
  ): Promise<Alquiler> {
    return this.personaRepository.alquilers(id).create(alquiler);
  }

  @patch('/personas/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Persona.Alquiler PATCH success count',
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
    return this.personaRepository.alquilers(id).patch(alquiler, where);
  }

  @del('/personas/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Persona.Alquiler DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Alquiler)) where?: Where<Alquiler>,
  ): Promise<Count> {
    return this.personaRepository.alquilers(id).delete(where);
  }
}
