import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCardComponent } from './dialog-edit-card.component';

describe('DialogEditCardComponent', () => {
  let component: DialogEditCardComponent;
  let fixture: ComponentFixture<DialogEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
