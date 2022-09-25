import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasCortasComponent } from './rutas-cortas.component';

describe('RutasCortasComponent', () => {
  let component: RutasCortasComponent;
  let fixture: ComponentFixture<RutasCortasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutasCortasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutasCortasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
