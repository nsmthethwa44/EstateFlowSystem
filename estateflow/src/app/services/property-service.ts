import { Injectable } from '@angular/core';
import { Property } from '../models/property.mode';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
   private baseUrl = `${environment.apiUrl}/api/property`;

 constructor(private http: HttpClient) {}

//  add new property 
  addProperty(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }

  // get all properties
  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}`);
  }


  // delete property by id 
  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // update property by id 
  updateProperty(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  // Update only status
 updateStatus(id: number, status: string): Observable<any> {
    return this.http.put( `${this.baseUrl}/${id}/status`, { status: status },  // matches StatusUpdateDto
      { headers: { 'Content-Type': 'application/json' } }
    );
  }


}
