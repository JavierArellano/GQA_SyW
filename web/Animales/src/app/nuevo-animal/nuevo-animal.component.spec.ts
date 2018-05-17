import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAnimalComponent } from './nuevo-animal.component';

describe('NuevoAnimalComponent', () => {
  let component: NuevoAnimalComponent;
  let fixture: ComponentFixture<NuevoAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
