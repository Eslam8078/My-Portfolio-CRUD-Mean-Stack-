import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEducation } from './list-education';

describe('ListEducation', () => {
  let component: ListEducation;
  let fixture: ComponentFixture<ListEducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEducation],
    }).compileComponents();

    fixture = TestBed.createComponent(ListEducation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
