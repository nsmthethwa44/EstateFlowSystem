import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user-service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-agents',
  imports: [CommonModule],
  templateUrl: './agents.html',
  styleUrl: './agents.scss',
})
export class Agents implements OnInit{
agents: User[] = [];
constructor(private userSer: UserService){}
baseUrl = environment.apiUrl;
isLoading = false;

getAgents(){
  this.isLoading = true;

  this.userSer.getUsers().subscribe({
    next: (res) =>{this.agents = res},
    error: (err) =>{console.error(err)},
    complete: () => this.isLoading = false,
  })
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAgents();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

}
