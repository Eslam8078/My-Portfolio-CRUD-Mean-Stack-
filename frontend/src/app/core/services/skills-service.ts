import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISkill } from '../models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private http: HttpClient) {}
  private apiURL = 'http://localhost:3000/api/skills';

getSkills() {
    return this.http.get<ISkill[]>(this.apiURL, { params: { t: Date.now() } });
  }
  getSkillById(id: string) {
    return this.http.get<ISkill>(`${this.apiURL}/${id}`);
  }
  addSkill(skill: ISkill) {
    return this.http.post<ISkill>(this.apiURL, skill);
  }
  updateSkill(id: string, skill: ISkill) {
    return this.http.put<ISkill>(`${this.apiURL}/${id}`, skill);
  }
  deleteSkill(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
