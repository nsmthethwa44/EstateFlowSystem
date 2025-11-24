import { Component, OnInit } from '@angular/core';
import { Auth } from '../../auth/services/auth';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
   loggedInUser!: Observable<User | null>
constructor(public authSer: Auth, private sidebarSer: SidebarService){}
 private baseUrl = environment.apiUrl;

 ngOnInit(): void {
    this.loggedInUser = this.authSer.currentUser$;
}
getImageUrl(path: string | undefined): string{
  return path ?`${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

toggleSidebar(){
this.sidebarSer.toggleSidebar();
}
}
