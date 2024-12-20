import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerProfileComponent } from './freelancerprofile.component';

describe('FreelancerprofileComponent', () => {
  let component: FreelancerProfileComponent;
  let fixture: ComponentFixture<FreelancerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
