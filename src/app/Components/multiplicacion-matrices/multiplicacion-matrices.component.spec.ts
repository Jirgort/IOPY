import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicacionMatricesComponent } from './multiplicacion-matrices.component';

describe('MultiplicacionMatricesComponent', () => {
  let component: MultiplicacionMatricesComponent;
  let fixture: ComponentFixture<MultiplicacionMatricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplicacionMatricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicacionMatricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
