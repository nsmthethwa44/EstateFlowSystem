import { Component, OnInit } from '@angular/core';
import { Property } from '../../../models/property.mode';
import { PropertyService } from '../../../services/property-service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-properties-component',
  imports: [CommonModule],
  templateUrl: './admin-properties-component.html',
  styleUrl: './admin-properties-component.scss',
})
export class AdminPropertiesComponent implements OnInit{
properties: Property[] = [];
constructor(private propertySer: PropertyService){}
private baseUrl = environment.apiUrl;
isLoading = false;

getProperties(){
  this.isLoading = true;

  this.propertySer.getAllProperties().subscribe({
    next: (res) =>{this.properties = res},
    error: (err) =>{console.error(err)},
    complete: () =>{this.isLoading = false}
  })
}

ngOnInit(): void {
  this.getProperties();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

updateStatus(id: number, newStatus: string){
  Swal.fire({
      title: 'Update Status?',
      text: `Change status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
           Swal.fire({
              title: 'Approving Property...',
              allowOutsideClick: false,
              didOpen: () => Swal.showLoading()
            });
        this.propertySer.updateStatus(id, newStatus).subscribe({
          next: () => {
            Swal.fire({
                      icon: 'success',
                      title: 'Status updated successfully',
                      timer: 1800,
                      showConfirmButton: false
                    });
                     this.getProperties();
          },
          error: () => {
                      Swal.fire({
                      icon: 'error',
                      title: 'Failed to update status',
                      text: 'Please try again later.',
                      timer: 1800,
                      showConfirmButton: false
                    });
          }
        });
      }
    });
}

}
