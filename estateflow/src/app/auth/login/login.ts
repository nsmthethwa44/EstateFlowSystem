import { Component } from '@angular/core';
import { Copyright } from "../../component/copyright/copyright";
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [Copyright, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
loginForm: FormGroup;

constructor(private fb: FormBuilder, private authSer: Auth){
    this.loginForm = this.fb.group({
     email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(5)]]
  })
}

onSubmit(){
   if (this.loginForm.invalid) return;

   Swal.fire({
      title: 'Logging In...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const data = this.loginForm.value

    this.authSer.login(data).subscribe({
        next: (res: any) => this.handleSuccess(res),
          error: () => this.handleError(),
    })
}

 private handleSuccess(res: any): void {
  Swal.fire({
    icon: 'success',
    title: 'Login Successful',
    text: 'You have successfully logged in.',
    timer: 1800,
    showConfirmButton: false
  });
}

private handleError(): void {
  setTimeout(() => {
    Swal.fire({
    icon: 'error',
    title: 'Login Failed',
    text: 'Failed to log in.',
    timer: 1800,
    showConfirmButton: false
  });
    }, 3000); // Hide after 3s
}

}
