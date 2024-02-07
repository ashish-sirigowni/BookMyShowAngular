import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCitiesComponent } from './get-all-cities.component';

describe('GetAllCitiesComponent', () => {
  let component: GetAllCitiesComponent;
  let fixture: ComponentFixture<GetAllCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
