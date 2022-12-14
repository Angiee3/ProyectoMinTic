import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Venta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Persona)
  personaId: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
