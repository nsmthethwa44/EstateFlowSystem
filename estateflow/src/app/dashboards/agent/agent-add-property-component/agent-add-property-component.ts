import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PropertyService } from '../../../services/property-service';
import Swal from 'sweetalert2';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-add-property-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent-add-property-component.html',
  styleUrl: './agent-add-property-component.scss',
})
export class AgentAddPropertyComponent {
 properties: any[] = [];
  propertyForm!: FormGroup;
  selectedFile: File | null = null;
  userId: number = 0;
  @Input() isVisible = true;

  constructor(
    private fb: FormBuilder,
    private propertySer: PropertyService,

  ) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['', Validators.required],
      bedrooms: ['', Validators.required],
      bathrooms: ['', Validators.required],
      size: ['', Validators.required],
      imageUrl: [null]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.propertyForm.invalid) return;

    const formData = new FormData();
    formData.append('Title', this.propertyForm.value.title);
    formData.append('Description', this.propertyForm.value.description);
    formData.append('Price', this.propertyForm.value.price);
    formData.append('Address', this.propertyForm.value.address);
    formData.append('City', this.propertyForm.value.city);
    formData.append('Province', this.propertyForm.value.province);
    formData.append('Country', this.propertyForm.value.country);
    formData.append('Bedrooms', this.propertyForm.value.bedrooms);
    formData.append('Bathrooms', this.propertyForm.value.bathrooms);
    formData.append('Size', this.propertyForm.value.size);
    if (this.selectedFile) formData.append('ImageUrl', this.selectedFile);

    Swal.fire({
      title: 'Adding property...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.propertySer.addProperty(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Property added successfully!',
          timer: 1800,
          showConfirmButton: false
        });
      
        this.propertyForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error adding property',
          text: 'Please try again later.'
        });
      }
    });
  }



openModal() {
  this.currentStep = 1; // reset wizard
}

closeModal() {
  this.isVisible= false;
}

currentStep = 1;
previewImage: string | null = null;

nextStep() {
  if (this.currentStep < 3) this.currentStep++;
}

prevStep() {
  if (this.currentStep > 1) this.currentStep--;
}

// onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => this.previewImage = reader.result as string;
//     reader.readAsDataURL(file);
//   }
// }




}
