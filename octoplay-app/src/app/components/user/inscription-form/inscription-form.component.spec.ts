import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionFormComponent } from './inscription-form.component';

describe('InscriptionFormComponent', () => {
  let component: InscriptionFormComponent;
  let fixture: ComponentFixture<InscriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
