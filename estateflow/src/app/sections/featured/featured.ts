import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/property.mode';
import { PropertyService } from '../../services/property-service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured',
  imports: [CommonModule, RouterLink],
  templateUrl: './featured.html',
  styleUrl: './featured.scss',
})
export class Featured implements OnInit{
properties: Property[] = [];
isLoading = false;
baseUrl = environment.apiUrl;

constructor(private propertySer: PropertyService){}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

getProperties(){
  this.isLoading = true;

  this.propertySer.getAllProperties().subscribe({
    next: (res) =>{this.properties = res},
    error: (err) =>{console.error(err)},
    complete: () => this.isLoading = false,
  })
}

ngOnInit(): void {
  this.getProperties();
}
}
