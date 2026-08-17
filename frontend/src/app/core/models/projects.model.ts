export interface IProject {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  livedemo: string;
  createdAt?: string;
  updatedAt?: string;
}
