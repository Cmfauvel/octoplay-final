import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddOrderItemsComponent } from './button-add-order-items.component';

describe('ButtonAddOrderItemsComponent', () => {
  let component: ButtonAddOrderItemsComponent;
  let fixture: ComponentFixture<ButtonAddOrderItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAddOrderItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
