import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {Persona} from './persona.model';
import {Alquiler} from './alquiler.model';
import {Venta} from './venta.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  anio: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  tipoOferta: number;

  @property({
    type: 'string',
    required: true,
  })
  fotografias: string;

  @property({
    type: 'string',
  })
  enlace?: string;

  @belongsTo(() => TipoVehiculo)
  tipoVehiculoId: string;

  @belongsTo(() => Persona)
  personaId: string;

  @hasMany(() => Alquiler)
  alquilers: Alquiler[];

  @hasOne(() => Venta)
  venta: Venta;

  @property({
    type: 'string',
  })
  ventaId?: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
