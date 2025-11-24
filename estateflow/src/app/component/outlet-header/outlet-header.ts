import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-outlet-header',
  imports: [RouterLink, RouterModule],
  templateUrl: './outlet-header.html',
  styleUrl: './outlet-header.scss',
})
export class OutletHeader {
  isNavBarOpen = false;

  toggleNavBar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }

  closeNavbar() {
    this.isNavBarOpen = false;
  }
}
