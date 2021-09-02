import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BazarDetailsComponent } from './bazar-details.component';

describe('BazarDetailsComponent', () => {
  let component: BazarDetailsComponent;
  let fixture: ComponentFixture<BazarDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BazarDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BazarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
