import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupfreelancerComponent } from './signupfreelancer.component';

describe('SignupfreelancerComponent', () => {
  let component: SignupfreelancerComponent;
  let fixture: ComponentFixture<SignupfreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupfreelancerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupfreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
