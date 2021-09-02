import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierListComponent } from './panier-list.component';

describe('PanierListComponent', () => {
  let component: PanierListComponent;
  let fixture: ComponentFixture<PanierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
