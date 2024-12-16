import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientFormComponent } from './edit-client-form.component';

describe('EditClientFormComponent', () => {
  let component: EditClientFormComponent;
  let fixture: ComponentFixture<EditClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditClientFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
