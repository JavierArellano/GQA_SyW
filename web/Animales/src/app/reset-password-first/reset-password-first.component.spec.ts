import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordFirstComponent } from './reset-password-first.component';

describe('ResetPasswordFirstComponent', () => {
  let component: ResetPasswordFirstComponent;
  let fixture: ComponentFixture<ResetPasswordFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
