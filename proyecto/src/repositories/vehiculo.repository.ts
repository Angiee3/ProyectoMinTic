import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, TipoVehiculo, Persona, Alquiler, Venta} from '../models';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {PersonaRepository} from './persona.repository';
import {AlquilerRepository} from './alquiler.repository';
import {VentaRepository} from './venta.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly tipoVehiculo: BelongsToAccessor<TipoVehiculo, typeof Vehiculo.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Vehiculo.prototype.id>;

  public readonly alquilers: HasManyRepositoryFactory<Alquiler, typeof Vehiculo.prototype.id>;

  public readonly venta: HasOneRepositoryFactory<Venta, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('AlquilerRepository') protected alquilerRepositoryGetter: Getter<AlquilerRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.venta = this.createHasOneRepositoryFactoryFor('venta', ventaRepositoryGetter);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
    this.alquilers = this.createHasManyRepositoryFactoryFor('alquilers', alquilerRepositoryGetter,);
    this.registerInclusionResolver('alquilers', this.alquilers.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.tipoVehiculo = this.createBelongsToAccessorFor('tipoVehiculo', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculo', this.tipoVehiculo.inclusionResolver);
  }
}
