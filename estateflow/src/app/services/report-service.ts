import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = `${environment.apiUrl}/api/report`

  constructor(private http: HttpClient) { }

  getAdminSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin-summary`);
  }

  getAgentSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agent-summary`);
  }

  getBuyerSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/buyer-summary`);
  }
}
