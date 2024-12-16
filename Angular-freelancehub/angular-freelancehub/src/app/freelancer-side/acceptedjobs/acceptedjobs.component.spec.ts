import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedjobsComponent } from './acceptedjobs.component';

describe('AcceptedjobsComponent', () => {
  let component: AcceptedjobsComponent;
  let fixture: ComponentFixture<AcceptedjobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptedjobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
