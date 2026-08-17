import { Routes } from '@angular/router';
import { HomeComponent as homelayout } from './layout/home/home';
import { About as aboutlayout } from './layout/about/about';
import { Skills as skillslayout } from './layout/skills/skills';
import { Projects as projectslayout } from './layout/projects/projects';
import { Contact as contactlayout } from './layout/contact/contact';
import { Dashboard } from './dashboard/dashboard';
import { About } from './dashboard/about/about';
import { Skills } from './dashboard/skills/skills';
import { Projects } from './dashboard/projects/projects';
import { Messages } from './dashboard/messages/messages';
import { Home } from './dashboard/home/home';
import { Layout } from './layout/layout';
import { Education as educationlayout } from './layout/education/education';
import { Education } from './dashboard/education/education';
import { Experience } from './dashboard/experience/experience';
import { Experience as experiencelayout } from './layout/experience/experience';
import { Notfound } from './shared/notfound/notfound';
import { ListEducation } from './dashboard/education/list-education/list-education';
import { AddEducation } from './dashboard/education/add-education/add-education';
import { EditEducation } from './dashboard/education/edit-education/edit-education';
import { SkillsList } from './dashboard/skills/skills-list/skills-list';
import { SkillsAdd } from './dashboard/skills/skills-add/skills-add';
import { SkillsEdit } from './dashboard/skills/skills-edit/skills-edit';
import { ExperienceList } from './dashboard/experience/experience-list/experience-list';
import { ExperienceAdd } from './dashboard/experience/experience-add/experience-add';
import { ExperienceEdit } from './dashboard/experience/experience-edit/experience-edit';
import { ProjectsList } from './dashboard/projects/projects-list/projects-list';
import { ProjectsAdd } from './dashboard/projects/projects-add/projects-add';
import { ProjectsEdit } from './dashboard/projects/projects-edit/projects-edit';
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'about',
        component: aboutlayout,
      },
      {
        path: 'skills',
        component: skillslayout,
      },
      {
        path: 'projects',
        component: projectslayout,
      },
      {
        path: 'experience',
        component: experiencelayout,
      },
      {
        path: 'contact',
        component: contactlayout,
      },
      {
        path: 'home',
        component: homelayout,
      },
      {
        path: 'education',
        component: educationlayout,
      },
    ],
  },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'about',
        component: About,
      },
      {
        path: 'skills',
        component: Skills,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: SkillsList,
          },
          {
            path: 'add',
            component: SkillsAdd,
          },
          {
            path: 'edit/:id',
            component: SkillsEdit,
          },
        ],
      },
      {
        path: 'projects',
        component: Projects,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ProjectsList,
          },
          {
            path: 'add',
            component: ProjectsAdd,
          },
          {
            path: 'edit/:id',
            component: ProjectsEdit,
          },
        ],
      },
      {
        path: 'experience',
        component: Experience,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ExperienceList,
          },
          {
            path: 'add',
            component: ExperienceAdd,
          },
          {
            path: 'edit/:id',
            component: ExperienceEdit,
          },
        ],
      },
      {
        path: 'messages',
        component: Messages,
      },
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'education',
        component: Education,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },

          {
            path: 'list',
            component: ListEducation,
          },

          {
            path: 'add',
            component: AddEducation,
          },

          {
            path: 'edit/:id',
            component: EditEducation,
          },
        ],
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    component: Notfound,
  },
];
