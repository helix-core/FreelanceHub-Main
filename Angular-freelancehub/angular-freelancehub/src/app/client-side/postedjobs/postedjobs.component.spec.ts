import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedJobsComponent } from './postedjobs.component';

describe('PostedJobsComponent', () => {
  let component: PostedJobsComponent;
  let fixture: ComponentFixture<PostedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostedJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
