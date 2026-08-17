import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceEdit } from './experience-edit';

describe('ExperienceEdit', () => {
  let component: ExperienceEdit;
  let fixture: ComponentFixture<ExperienceEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
