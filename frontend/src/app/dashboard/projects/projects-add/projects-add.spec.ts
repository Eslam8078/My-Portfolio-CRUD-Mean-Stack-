import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAdd } from './projects-add';

describe('ProjectsAdd', () => {
  let component: ProjectsAdd;
  let fixture: ComponentFixture<ProjectsAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
