import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import Swal from 'sweetalert2';
import { Auth } from '../../auth/services/auth';

@Component({
  selector: 'app-update-user-profile-popup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-user-profile-popup.html',
  styleUrl: './update-user-profile-popup.scss',
})
export class UpdateUserProfilePopup {
@Input()  isVisible = false;
 form: FormGroup;
 imageFile!: File;
 imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private userSer: UserService, private authSer: Auth) {
    this.form = this.fb.group({
      phoneNumber: ['', Validators.required],
      officeAddress: ['', Validators.required],
      imageFile: [null]
    });
  }

  close() {
    this.isVisible = false;
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result);
    reader.readAsDataURL(this.imageFile);
  }

 onSubmit() {
  if (this.form.invalid) return;

  const formData = new FormData();
  formData.append('PhoneNumber', this.form.value.phoneNumber);
  formData.append('OfficeAddress', this.form.value.officeAddress);

  if (this.imageFile) {
    formData.append('ImageFile', this.imageFile);
  }

     Swal.fire({
        title: 'Updating Profile...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

  this.userSer.updateProfile(formData).subscribe({
    next: (res: any) => {
       const currentUser = this.authSer.getUserFromStorage();
        if (currentUser) {
         currentUser.imageUrl = res.imageUrl || "";
        this.authSer.refreshUser(currentUser);  // currentUser is guaranteed not null
      }

         Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: res.message || 'Profile updated successfully!',
        timer: 1800,
        showConfirmButton: false
      }).then(() => {
        this.close();
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err?.error?.message || 'An error occurred while updating your profile.',
        timer: 1800,
        showConfirmButton: false
      });
      console.error(err);
    }
  });
}

}
