import { Component } from '@angular/core';
import { Copyright } from "../../component/copyright/copyright";
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Copyright, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
form: FormGroup;

constructor(private fb: FormBuilder, private authSer: Auth, private router: Router){
  this.form = this.fb.group({
    name: ["", Validators.required],
    email: ["", [ Validators.required, Validators.email]],
    role: ["", Validators.required],
    password: ["", [Validators.required, Validators.min(5)]]
  })
}

onRegister(){
  if(this.form.invalid) return

   Swal.fire({
        title: 'Signing Up...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const data = this.form.value;

      this.authSer.register(data).subscribe({
      next: () =>{
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'You can now log in.',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: err.error?.message || 'Please try again later.',
          timer: 2000,
          showConfirmButton: false
        });
      }
      })

}
}
