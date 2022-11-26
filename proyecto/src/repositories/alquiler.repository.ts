import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Alquiler, AlquilerRelations, Persona, Vehiculo} from '../models';
import {PersonaRepository} from './persona.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class AlquilerRepository extends DefaultCrudRepository<
  Alquiler,
  typeof Alquiler.prototype.id,
  AlquilerRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Alquiler.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Alquiler.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Alquiler, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
