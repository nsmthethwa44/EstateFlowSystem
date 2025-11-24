import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Offer } from '../models/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private baseUrl = `${environment.apiUrl}/api/offer`;  

  constructor(private http: HttpClient) {}

  createOffer(dto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, dto);
  }

  getBuyerOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/my-offers`);
  }

  getAgentOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/agent`);
  }

  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.baseUrl}/admin`);
  }

  updateOfferStatus(id: number, dto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/status`, dto);
  }

  // delete offer 
   deleteOffer(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
