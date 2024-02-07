import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSeatingComponent } from './get-seating.component';

describe('GetSeatingComponent', () => {
  let component: GetSeatingComponent;
  let fixture: ComponentFixture<GetSeatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSeatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetSeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
