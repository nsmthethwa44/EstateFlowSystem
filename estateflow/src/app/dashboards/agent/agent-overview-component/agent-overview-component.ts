import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../auth/services/auth';
import { UpdateUserProfilePopup } from "../../../component/update-user-profile-popup/update-user-profile-popup";
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { Property } from '../../../models/property.mode';
import { UserService } from '../../../services/user-service';
import { environment } from '../../../../environments/environment';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ReportService } from '../../../services/report-service';
import { Offer } from '../../../models/offer.model';
import { OfferService } from '../../../services/offer-service';

@Component({
  selector: 'app-agent-overview-component',
  imports: [RouterLink, CommonModule, UpdateUserProfilePopup, NgxChartsModule],
  templateUrl: './agent-overview-component.html',
  styleUrl: './agent-overview-component.scss',
})
export class AgentOverviewComponent implements OnInit {
 isProfileVisible = false;
 loggedInUser!: Observable<User | null>
 properties: Property[]  = [];
 private baseUrl = environment.apiUrl;
 summary: any = {};
 offers: Offer[] = [];

constructor(public authSer: Auth, private userSer: UserService,
   private reportSer: ReportService, private offerSer: OfferService){}

toggleProfilePopup() {
    this.isProfileVisible = !this.isProfileVisible;
  }

  getMyProperties(){
    this.userSer.getMyProperties().subscribe(res =>{
      this.properties = res
    })
  }

  getAgentSummary(){
    this.reportSer.getAgentSummary().subscribe({
      next: (res) =>{
        this.summary = res;
      }
    })
  }

  getMyOffers(){
    this.offerSer.getAgentOffers().subscribe({
      next: (res) =>{
        this.offers = res;
      }
    })
  }

  ngOnInit(): void {
    this.loggedInUser = this.authSer.currentUser$;
    if(!this.loggedInUser){
      this.isProfileVisible = true;
    }
    this.getMyProperties();
    this.getAgentSummary();
    this.getMyOffers();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

     // Stats
  completedSales = 12;

  // Chart view size
  view: [number, number] = [700, 250];

  // Chart colors
colorScheme: Color = {
  name: 'agentScheme',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']
};

  // NGX Charts Data
  graphData = [
    {
      "name": "Listings Added",
      "series": [
        { "name": "Jan", "value": 4 },
         { "name": "Feb", "value": 6 },
        { "name": "Mar", "value": 3 },
        { "name": "Apr", "value": 8 },
        { "name": "May", "value": 7 },
         { "name": "Jun", "value": 6 }
      ]
    },
    {
      "name": "Offers Received",
      "series": [
        { "name": "Jan", "value": 5 },
        { "name": "Feb", "value": 3 },
        { "name": "Mar", "value": 7 },
        { "name": "Apr", "value": 4 },
        { "name": "May", "value": 6 },
        { "name": "Jun", "value": 8 }
      ]
    },
    {
      "name": "Sales Completed",
      "series": [
        { "name": "Jan", "value": 1 },
        { "name": "Feb", "value": 2 },
        { "name": "Mar", "value": 1 },
        { "name": "Apr", "value": 3 },
        { "name": "May", "value": 4 },
        { "name": "Jun", "value": 1 }
      ]
    }
  ];

}
