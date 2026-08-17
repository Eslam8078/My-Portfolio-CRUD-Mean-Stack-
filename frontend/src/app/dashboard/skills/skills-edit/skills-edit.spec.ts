import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsEdit } from './skills-edit';

describe('SkillsEdit', () => {
  let component: SkillsEdit;
  let fixture: ComponentFixture<SkillsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
