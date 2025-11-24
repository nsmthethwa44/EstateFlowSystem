import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Property } from '../../models/property.mode';
import { PropertyService } from '../../services/property-service';
import { environment
  
 } from '../../../environments/environment';
@Component({
  selector: 'app-top-rated',
  imports: [CommonModule, RouterLink],
  templateUrl: './top-rated.html',
  styleUrl: './top-rated.scss',
})
export class TopRated implements OnInit{
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
