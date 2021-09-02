import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierFacturationComponent } from './panier-facturation.component';

describe('PanierFacturationComponent', () => {
  let component: PanierFacturationComponent;
  let fixture: ComponentFixture<PanierFacturationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierFacturationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierFacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
