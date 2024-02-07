import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShowsByMultiplexComponent } from './get-shows-by-multiplex.component';

describe('GetShowsByMultiplexComponent', () => {
  let component: GetShowsByMultiplexComponent;
  let fixture: ComponentFixture<GetShowsByMultiplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetShowsByMultiplexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetShowsByMultiplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
