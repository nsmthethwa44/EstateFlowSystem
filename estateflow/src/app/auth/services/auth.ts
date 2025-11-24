import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = `${environment.apiUrl}/api/auth`;
  private currentUserSource = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

//   private decodeToken(token: string): any {
//   try {
//     const payload = token.split('.')[1];
//     const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
//     return JSON.parse(decoded);
//   } catch (e) {
//     console.error("Invalid token:", e);
//     return null;
//   }
// }

  login(data: any) {
    return this.http.post<User>(`${this.baseUrl}/login`, data).pipe(
      map(user => {
        if (user && user.token) {

        // const claims = this.decodeToken(user.token);
        // console.log("JWT Claims:", claims);
        // console.log("Backend imageUrl:", user.imageUrl);

          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.redirectByRole(user.role)
        }
        return user;
      })
    );
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  redirectByRole(role: string) {
  const lowerRole = role.toLowerCase();

  if (lowerRole === 'admin') {
    this.router.navigate(['/admin']);
  } else if (lowerRole === 'agent') {
    this.router.navigate(['/agent']);
  } else if (lowerRole === 'buyer') {
    this.router.navigate(['/buyer']);
  } else {
    this.router.navigate(['/login']);
  }
}

get isProfileComplete(): boolean {
    const u = this.getUserFromStorage();
    if (!u) return false;
    return !!(u.imageUrl);
  }

  refreshUser(updatedUser: User) {
  localStorage.setItem('user', JSON.stringify(updatedUser));
  this.currentUserSource.next(updatedUser);
}


}
