import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-users-component',
  imports: [CommonModule],
  templateUrl: './admin-users-component.html',
  styleUrl: './admin-users-component.scss',
})
export class AdminUsersComponent implements OnInit {
users: any[] = [];
constructor(private userSer: UserService){}
private baseUrl = environment.apiUrl;
isLoading = false;

getUsers(){
  this.isLoading = true;

  this.userSer .getUsers().subscribe({
    next: (res) =>{this.users = res},
    error: (err) =>{console.error(err)},
    complete: () =>{this.isLoading = false}
  })
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

ngOnInit(): void {
  this.getUsers();
}
}
