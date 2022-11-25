import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Venta, Alquiler} from '../models';
import {VentaRepository} from './venta.repository';
import {AlquilerRepository} from './alquiler.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Cliente.prototype.id>;

  public readonly alquilers: HasManyRepositoryFactory<Alquiler, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('AlquilerRepository') protected alquilerRepositoryGetter: Getter<AlquilerRepository>,
  ) {
    super(Cliente, dataSource);
    this.alquilers = this.createHasManyRepositoryFactoryFor('alquilers', alquilerRepositoryGetter,);
    this.registerInclusionResolver('alquilers', this.alquilers.inclusionResolver);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
  }
}
