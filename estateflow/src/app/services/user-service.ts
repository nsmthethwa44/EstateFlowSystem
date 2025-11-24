import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Property } from '../models/property.mode';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private apiUrl = `${environment.apiUrl}/api/user`;

  constructor(private http: HttpClient) {}

  // get all users 
  getUsers(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

  // update user profile 
  updateProfile(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}`, formData);
  }

  // get a agent properties 
  getMyProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${this.apiUrl}/my-properties`)
  }
}
