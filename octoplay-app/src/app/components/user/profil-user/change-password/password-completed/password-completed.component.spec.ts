import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCompletedComponent } from './password-completed.component';

describe('PasswordCompletedComponent', () => {
  let component: PasswordCompletedComponent;
  let fixture: ComponentFixture<PasswordCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
