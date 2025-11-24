import { Component , Input, OnInit} from '@angular/core';
import { SidebarLinks } from '../../constant/sidebar-links';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../../auth/services/auth';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
@Input() role: 'admin' | 'agent' | 'buyer' = 'buyer';
loggedInUser!: Observable<User | null>
constructor(private authSer: Auth, private sidebarSer: SidebarService){}
 private baseUrl = environment.apiUrl;

ngOnInit(): void {
    this.loggedInUser = this.authSer.currentUser$;
}

getImageUrl(path: string | undefined): string{
  return path ?`${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

get links() {
    return SidebarLinks[this.role] || [];
  }

  logOut(){
    this.authSer.logout();
  }

  closeSidebar(){
    this.sidebarSer.closeSidebar();
  }
}
