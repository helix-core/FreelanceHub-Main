import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedjobsComponent } from './assignedjobs.component';

describe('AssignedjobsComponent', () => {
  let component: AssignedjobsComponent;
  let fixture: ComponentFixture<AssignedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedjobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
