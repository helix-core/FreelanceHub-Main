import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerEditComponent } from './edit-freelancer.component';

describe('FreelancerEditComponent', () => {
  let component: FreelancerEditComponent;
  let fixture: ComponentFixture<FreelancerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
