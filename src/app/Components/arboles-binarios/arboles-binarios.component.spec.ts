import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolesBinariosComponent } from './arboles-binarios.component';

describe('ArbolesBinariosComponent', () => {
  let component: ArbolesBinariosComponent;
  let fixture: ComponentFixture<ArbolesBinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolesBinariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolesBinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
