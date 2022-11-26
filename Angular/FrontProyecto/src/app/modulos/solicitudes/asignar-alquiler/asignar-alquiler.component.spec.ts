import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAlquilerComponent } from './asignar-alquiler.component';

describe('AsignarAlquilerComponent', () => {
  let component: AsignarAlquilerComponent;
  let fixture: ComponentFixture<AsignarAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarAlquilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
