import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearVehiculoComponent } from './vehiculos/crear-vehiculo/crear-vehiculo.component';
import { EditarVehiculoComponent } from './vehiculos/editar-vehiculo/editar-vehiculo.component';
import { EliminarVehiculoComponent } from './vehiculos/eliminar-vehiculo/eliminar-vehiculo.component';
import { BuscarVehiculoComponent } from './vehiculos/buscar-vehiculo/buscar-vehiculo.component';
import { CrearTipoVehiculoComponent } from './tipo-vehiculo/crear-tipo-vehiculo/crear-tipo-vehiculo.component';
import { EditarTipoVehiculoComponent } from './tipo-vehiculo/editar-tipo-vehiculo/editar-tipo-vehiculo.component';
import { EliminarTipoVehiculoComponent } from './tipo-vehiculo/eliminar-tipo-vehiculo/eliminar-tipo-vehiculo.component';
import { BuscarTipoVehiculoComponent } from './tipo-vehiculo/buscar-tipo-vehiculo/buscar-tipo-vehiculo.component';


@NgModule({
  declarations: [
    CrearPersonaComponent,
    EditarPersonaComponent,
    EliminarPersonaComponent,
    BuscarPersonaComponent,
    CrearVehiculoComponent,
    EditarVehiculoComponent,
    EliminarVehiculoComponent,
    BuscarVehiculoComponent,
    CrearTipoVehiculoComponent,
    EditarTipoVehiculoComponent,
    EliminarTipoVehiculoComponent,
    BuscarTipoVehiculoComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
