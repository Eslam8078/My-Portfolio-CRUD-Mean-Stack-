import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceAdd } from './experience-add';

describe('ExperienceAdd', () => {
  let component: ExperienceAdd;
  let fixture: ComponentFixture<ExperienceAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
