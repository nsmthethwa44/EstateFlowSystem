import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OfferService } from '../../../services/offer-service';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buyer-make-offer-popup-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './buyer-make-offer-popup-component.html',
  styleUrl: './buyer-make-offer-popup-component.scss',
})
export class BuyerMakeOfferPopupComponent {
@Input() property: any;
@Output() close = new EventEmitter(); // just trying this method
private baseUrl = environment.apiUrl;

offerForm!: FormGroup;

  constructor(private offerService: OfferService) {}

  ngOnInit() {
    this.offerForm = new FormGroup({
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  submitOffer() {
    if (this.offerForm.invalid) {
      this.offerForm.markAllAsTouched();
      return;
    }

    const dto = {
      propertyId: this.property.id,
      amount: this.offerForm.value.amount
    };

   Swal.fire({
      title: 'Making Offer...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.offerService.createOffer(dto).subscribe({
      next: () => {
          Swal.fire({
               icon: 'success',
               title: 'Offer Made',
               text: 'Successfully Completed Making Offer',
               timer: 1800,
               showConfirmButton: false
             }).then(() => {
             this.close.emit();
             });
      },
      error: (err) => {
          Swal.fire({
                icon: 'error',
                title: 'Offer Failed',
                text: err?.error?.message || 'An error occurred while making an offer.',
                timer: 1800,
                showConfirmButton: false
              });
        console.error('Failed to submit offer.', err);
      }
    });
  }

  get amount() {
    return this.offerForm.get('amount');
  }

  getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}
}
