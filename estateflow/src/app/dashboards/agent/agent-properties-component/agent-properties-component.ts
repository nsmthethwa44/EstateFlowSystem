import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../auth/services/auth';
import { CommonModule } from '@angular/common';
import { UpdateUserProfilePopup } from "../../../component/update-user-profile-popup/update-user-profile-popup";
import { Property } from '../../../models/property.mode';
import { UserService } from '../../../services/user-service';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { AgentAddPropertyComponent } from "../agent-add-property-component/agent-add-property-component";
import { PropertyService } from '../../../services/property-service';

@Component({
  selector: 'app-agent-properties-component',
  imports: [CommonModule, UpdateUserProfilePopup, AgentAddPropertyComponent],
  templateUrl: './agent-properties-component.html',
  styleUrl: './agent-properties-component.scss',
})
export class AgentPropertiesComponent implements OnInit {
constructor(public authSer: Auth, private userSer: UserService, private propertySer: PropertyService) {}
isProfileVisible = false;
properties: Property[] = [];
private baseUrl = environment.apiUrl;
showModal = false;
isLoading = false;

toggleProfileVisible(){
  this.isProfileVisible = !this.isProfileVisible;
}

toggleShowModal(){
  this.showModal = !this.showModal;
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

getProperties(){
  this.isLoading = true;
  
    this.userSer.getMyProperties().subscribe({
      next: (res) =>{ this.properties = res;},
      error: (err) =>{console.error(err)},
      complete: () => {this.isLoading = false}
    })
}
ngOnInit(): void {
  this.getProperties()
}

 deleteProperty(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the property.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
           Swal.fire({
              title: 'Deleting Property...',
              allowOutsideClick: false,
              didOpen: () => Swal.showLoading()
            });
        this.propertySer.deleteProperty(id).subscribe({
          next: () => {
                 Swal.fire({
                      icon: 'success',
                      title: 'Property has been deleted',
                      timer: 1800,
                      showConfirmButton: false
                    });
              this.getProperties()
          },
          error: () => {
             Swal.fire({
                      icon: 'error',
                      title: 'Failed to delete property',
                      timer: 1800,
                      showConfirmButton: false
                    });
          }
        });
      }
    });
  }
  
}
