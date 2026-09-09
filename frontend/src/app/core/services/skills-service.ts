import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ISkill } from '../models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private readonly apiUrl = `${environment.apiBaseUrl}/skills`;

  constructor(private readonly http: HttpClient) {}

  getSkills() {
    return this.http.get<ISkill[]>(this.apiUrl, { params: { t: Date.now() } });
  }

  getSkillById(id: string) {
    return this.http.get<ISkill>(`${this.apiUrl}/${id}`);
  }

  addSkill(skill: ISkill) {
    return this.http.post<ISkill>(this.apiUrl, skill);
  }

  updateSkill(id: string, skill: ISkill) {
    return this.http.put<ISkill>(`${this.apiUrl}/${id}`, skill);
  }

  deleteSkill(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
