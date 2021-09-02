import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierConfirmComponent } from './panier-confirm.component';

describe('PanierConfirmComponent', () => {
  let component: PanierConfirmComponent;
  let fixture: ComponentFixture<PanierConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
