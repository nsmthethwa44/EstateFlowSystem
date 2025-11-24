import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollTop } from "./component/scroll-top/scroll-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ScrollTop],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'EstateFlow - Real Estate Management';
  isVisible = false;

  ngOnInit(): void {
    window.onscroll = () =>{
      if(window.scrollY > 2){
        this.isVisible = true;
      }else{
        this.isVisible = false;
      }
    }
    
  }
}
