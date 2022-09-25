import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReemplazoEquiposComponent } from './reemplazo-equipos.component';

describe('ReemplazoEquiposComponent', () => {
  let component: ReemplazoEquiposComponent;
  let fixture: ComponentFixture<ReemplazoEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReemplazoEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReemplazoEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
