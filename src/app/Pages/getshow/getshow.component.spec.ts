import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetshowComponent } from './getshow.component';

describe('GetshowComponent', () => {
  let component: GetshowComponent;
  let fixture: ComponentFixture<GetshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
