import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Alquiler, Persona, PersonaRelations, Vehiculo, Venta} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {VentaRepository} from './venta.repository';
import {AlquilerRepository} from './alquiler.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Persona.prototype.id>;

  public readonly alquilers: HasManyRepositoryFactory<Alquiler, typeof Persona.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('AlquilerRepository') protected alquilerRepositoryGetter: Getter<AlquilerRepository>,
  ) {
    super(Persona, dataSource);
    this.alquilers = this.createHasManyRepositoryFactoryFor('alquilers', alquilerRepositoryGetter,);
    this.registerInclusionResolver('alquilers', this.alquilers.inclusionResolver);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
