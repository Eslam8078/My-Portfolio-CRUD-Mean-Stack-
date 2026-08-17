import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducation } from './add-education';

describe('AddEducation', () => {
  let component: AddEducation;
  let fixture: ComponentFixture<AddEducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEducation],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEducation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
