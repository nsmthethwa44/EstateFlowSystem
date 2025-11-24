import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { OfferService } from '../../../services/offer-service';
import { Offer } from '../../../models/offer.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-offers-component',
  imports: [CommonModule],
  templateUrl: './admin-offers-component.html',
  styleUrl: './admin-offers-component.scss',
})
export class AdminOffersComponent implements OnInit{
 private baseUrl = environment.apiUrl;
 offers: Offer[] = [];
 isLoading = false;

constructor( private offerSer: OfferService){}

getAllOffers(){
  this.isLoading = true;

  this.offerSer.getAllOffers().subscribe({
    next:(res) =>{ this.offers = res;},
    error: (err) =>{console.error(err)},
    complete: () =>{this.isLoading = false}
  })
}

  ngOnInit(): void {
    this.getAllOffers();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

deleteOffer(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the offer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
           Swal.fire({
              title: 'Deleting Offer...',
              allowOutsideClick: false,
              didOpen: () => Swal.showLoading()
            });
        this.offerSer.deleteOffer(id).subscribe({
          next: () => {
                 Swal.fire({
                      icon: 'success',
                      title: 'Offer has been deleted',
                      timer: 1800,
                      showConfirmButton: false
                    });
              this.getAllOffers()
          },
          error: () => {
             Swal.fire({
                      icon: 'error',
                      title: 'Failed to delete offer',
                      timer: 1800,
                      showConfirmButton: false
                    });
          }
        });
      }
    });
  }


}
