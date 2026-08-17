import { HttpClient } from '@angular/common/http';
import { IAbout } from '../models/about.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
    constructor (private _http:HttpClient){}
    private apiURL= 'http://localhost:3000/api/about'

    getAbout(){
        return this._http.get<IAbout>(this.apiURL, { params: { t: Date.now() } })
    }
    updateAbout(formData: FormData ){
        return this._http.put<IAbout>(this.apiURL,formData)
    }

}
