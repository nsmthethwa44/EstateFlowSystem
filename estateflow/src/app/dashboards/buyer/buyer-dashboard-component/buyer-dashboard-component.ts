import { Component } from '@angular/core';
import { Sidebar } from "../../../component/sidebar/sidebar";
import { Header } from "../../../component/header/header";
import { Copyright } from "../../../component/copyright/copyright";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard-component',
  imports: [Sidebar, Header, RouterOutlet, Copyright],
  templateUrl: './buyer-dashboard-component.html',
  styleUrl: './buyer-dashboard-component.scss',
})
export class BuyerDashboardComponent {

}
