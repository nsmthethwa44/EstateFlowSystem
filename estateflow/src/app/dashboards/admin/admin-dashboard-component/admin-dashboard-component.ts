import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../../../component/sidebar/sidebar";
import { Header } from "../../../component/header/header";
import { Copyright } from "../../../component/copyright/copyright";
@Component({
  selector: 'app-admin-dashboard-component',
  imports: [RouterOutlet, Sidebar, Header, Copyright],
  templateUrl: './admin-dashboard-component.html',
  styleUrl: './admin-dashboard-component.scss',
})
export class AdminDashboardComponent {

}
