import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { Property } from '../../../models/property.mode';
import { Auth } from '../../../auth/services/auth';
import { PropertyService } from '../../../services/property-service';
import { environment } from '../../../../environments/environment';
import { ReportService } from '../../../services/report-service';
import { UpdateUserProfilePopup } from "../../../component/update-user-profile-popup/update-user-profile-popup";
import { BuyerMakeOfferPopupComponent } from "../buyer-make-offer-popup-component/buyer-make-offer-popup-component";
import { OfferService } from '../../../services/offer-service';
import { Offer } from '../../../models/offer.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buyer-overview-dashboard',
  imports: [CommonModule, UpdateUserProfilePopup, BuyerMakeOfferPopupComponent, RouterLink],
  templateUrl: './buyer-overview-dashboard.html',
  styleUrl: './buyer-overview-dashboard.scss',
})
export class BuyerOverviewDashboard {
 isProfileVisible = false;
 loggedInUser!: Observable<User | null>
 properties: Property[]  = [];
 private baseUrl = environment.apiUrl;
 summary: any = {};
 offers: Offer[] = [];
selectedProperty: any = null;
 
constructor(public authSer: Auth, private propertySer: PropertyService,
   private reportSer: ReportService, private offerSer: OfferService){}

getProperties(){
  this.propertySer.getAllProperties().subscribe(res =>{
    this.properties = res;
  })
}

getMyOffers(){
  this.offerSer.getBuyerOffers().subscribe({
    next:(res) =>{
      this.offers = res;
    }
  })
}

getBuyerSummary(){
  this.reportSer.getBuyerSummary().subscribe({
    next: (res) => {
        this.summary = res;
    },
  })
}

toggleProfilePopup() {
    this.isProfileVisible = !this.isProfileVisible;
  }

  openOfferPopup(property: any) {
    if(!this.authSer.isProfileComplete) return this.toggleProfilePopup();

    this.selectedProperty = property;
     this.getBuyerSummary()
  }

  ngOnInit(): void {
    this.loggedInUser = this.authSer.currentUser$;
    this.getProperties();
    this.getBuyerSummary();
    this.getMyOffers();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

 savedProperties = 12;
  offersMade = 4;
  visitsScheduled = 3;
  approvedDeals = 1;

  recommended = [
    {
      title: 'Modern Family House',
      location: 'Accra - East Legon',
      price: 350000,
      image: '/assets/properties/p1.jpg'
    },
    {
      title: 'Luxury Apartment',
      location: 'Tema Community 25',
      price: 220000,
      image: '/assets/properties/p2.jpg'
    }
  ];

  recentActivity = [
    "You scheduled a visit for 3-bedroom Apartment",
    "Offer sent for Luxury Home in Airport Hills",
    "You saved a new property in Spintex",
    "Seller approved your offer for East Legon House"
  ];

}
