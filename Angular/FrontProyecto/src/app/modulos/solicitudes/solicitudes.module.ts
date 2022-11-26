import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { AsignarAlquilerComponent } from './asignar-alquiler/asignar-alquiler.component';
import { AsignarVentaComponent } from './asignar-venta/asignar-venta.component';


@NgModule({
  declarations: [
    AsignarAlquilerComponent,
    AsignarVentaComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule
  ]
})
export class SolicitudesModule { }
