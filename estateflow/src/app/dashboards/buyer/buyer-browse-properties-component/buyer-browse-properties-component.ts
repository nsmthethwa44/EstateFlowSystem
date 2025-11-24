import { Component, OnInit } from '@angular/core';
import { Property } from '../../../models/property.mode';
import { PropertyService } from '../../../services/property-service';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BuyerMakeOfferPopupComponent } from "../buyer-make-offer-popup-component/buyer-make-offer-popup-component";
import { Auth } from '../../../auth/services/auth';
import { UpdateUserProfilePopup } from "../../../component/update-user-profile-popup/update-user-profile-popup";

@Component({
  selector: 'app-buyer-browse-properties-component',
  imports: [ReactiveFormsModule, CommonModule, BuyerMakeOfferPopupComponent, UpdateUserProfilePopup],
  templateUrl: './buyer-browse-properties-component.html',
  styleUrl: './buyer-browse-properties-component.scss',
})
export class BuyerBrowsePropertiesComponent implements OnInit{
 properties: Property[] = [];
 isLoading = true;
  baseUrl = environment.apiUrl;
  constructor(private propertySer: PropertyService, private authSer: Auth) {}
  selectedProperty: any = null;
  isProfileVisible = false;

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.isLoading = true;
    this.propertySer.getAllProperties().subscribe({
      next: (res) => {
        this.properties = res;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  toggleProfilePopup() {
    this.isProfileVisible = !this.isProfileVisible;
  }

  getImageUrl(path?: string) {
    return path ? `${this.baseUrl}${path}` : 'assets/img/img-01.jpeg';
  }
 
  
  openOfferPopup(property: any) {
    if(!this.authSer.isProfileComplete) return this.toggleProfilePopup();

    this.selectedProperty = property;
  }

}
