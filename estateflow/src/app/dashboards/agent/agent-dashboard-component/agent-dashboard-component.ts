import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../../component/sidebar/sidebar";
import { Header } from "../../../component/header/header";
import { Copyright } from "../../../component/copyright/copyright";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-agent-dashboard-component',
  imports: [Sidebar, Header, RouterOutlet, Copyright],
  templateUrl: './agent-dashboard-component.html',
  styleUrl: './agent-dashboard-component.scss',
})
export class AgentDashboardComponent {

}
