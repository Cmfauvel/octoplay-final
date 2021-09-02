import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewAddressComponent } from './dialog-new-address.component';

describe('DialogNewAddressComponent', () => {
  let component: DialogNewAddressComponent;
  let fixture: ComponentFixture<DialogNewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
