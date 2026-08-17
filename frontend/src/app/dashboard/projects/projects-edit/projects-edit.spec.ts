import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsEdit } from './projects-edit';

describe('ProjectsEdit', () => {
  let component: ProjectsEdit;
  let fixture: ComponentFixture<ProjectsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
