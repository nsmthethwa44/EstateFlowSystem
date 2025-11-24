import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OfferService } from '../../../services/offer-service';
import { Offer } from '../../../models/offer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-offers-component',
  imports: [CommonModule],
  templateUrl: './agent-offers-component.html',
  styleUrl: './agent-offers-component.scss',
})
export class AgentOffersComponent implements OnInit{
 private baseUrl = environment.apiUrl;
 offers: Offer[] = [];
 isLoading = false;

constructor(private offerSer: OfferService){}

getMyOffers(){
  this.isLoading = true;

  this.offerSer.getAgentOffers().subscribe({
    next:(res) =>{this.offers = res; },
    error: (err) => {console.error(err)},
    complete: () =>{this.isLoading = false}
  })
}
  ngOnInit(): void {
    this.getMyOffers();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}
}
