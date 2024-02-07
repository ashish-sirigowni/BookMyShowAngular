import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllMultiplexesComponent } from './get-all-multiplexes.component';

describe('GetAllMultiplexesComponent', () => {
  let component: GetAllMultiplexesComponent;
  let fixture: ComponentFixture<GetAllMultiplexesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllMultiplexesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllMultiplexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
