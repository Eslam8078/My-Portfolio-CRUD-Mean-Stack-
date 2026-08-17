import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAdd } from './skills-add';

describe('SkillsAdd', () => {
  let component: SkillsAdd;
  let fixture: ComponentFixture<SkillsAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
