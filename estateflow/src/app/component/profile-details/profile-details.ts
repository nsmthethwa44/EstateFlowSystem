import { Component } from '@angular/core';
import { UpdateUserProfilePopup } from "../update-user-profile-popup/update-user-profile-popup";

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [UpdateUserProfilePopup],
  templateUrl: './profile-details.html',
  styleUrl: './profile-details.scss',
})
export class ProfileDetails {
 isProfileVisible = true;

 toggleProfilePopup() {
    this.isProfileVisible = !this.isProfileVisible;
  }

  
}
