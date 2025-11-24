import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class ProfileCompletionGuard implements CanActivate {
  constructor(private authSer: Auth, private router: Router) {}

  canActivate(): boolean {
    if (!this.authSer.isProfileComplete) {
      this.router.navigate(['/login'], {
        queryParams: { required: true }
      });
      return false;
    }
    return true;
  }
}
