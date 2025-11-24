import { Component, OnInit } from '@angular/core';
import { Property } from '../../../models/property.mode';
import { environment } from '../../../../environments/environment';
import { PropertyService } from '../../../services/property-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportService } from '../../../services/report-service';

@Component({
  selector: 'app-admin-overview-component',
  standalone: true,
  imports: [ CommonModule, RouterLink, NgxChartsModule],
  templateUrl: './admin-overview-component.html',
  styleUrl: './admin-overview-component.scss',
})
export class AdminOverviewComponent implements OnInit{
properties: Property[] = [];
private baseUrl = environment.apiUrl;
summary: any = {};
statistics: any[] = [];
isLoading = false;

constructor(private propertySer: PropertyService, private reportSer: ReportService){}

getAllProperties(){
  this.isLoading = true;

  this.propertySer.getAllProperties().subscribe({
    next: (res) => {this.properties = res},
    error:(err) =>{console.error(err)},
    complete: () =>{ this.isLoading = false;}
  })

}

getAdminSummary(){
  this.reportSer.getAdminSummary().subscribe({
    next: (res) => {
        this.summary = res;

        this.statistics = [
          {
            name: "Total Listings",
            value: res.totalListings || 0,
            icon: "fa-solid fa-house-chimney-user"
          },
          {
            name: "Total Offers",
            value: res.totalOffers || 0,
            icon: "fa-solid fa-money-bill-wave"
          },
          {
            name: "Pending Approvals",
            value: res.pendingApproval || 0,
            icon: "fa-solid fa-thumbs-up"
          },
          {
            name: "Average Sales",
            value: 0,
            icon: "fa-solid fa-chart-simple"
          }
        ];
    },
  })
}

ngOnInit(): void {
this.getAllProperties();  
this.getAdminSummary();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

  view: [number, number] = [700, 300];

  colorScheme: any = {
    domain: ['#2563eb', '#22c55e', '#FFA726', '#ef4444']
  };

}
