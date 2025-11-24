import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OutletHeader } from "../../component/outlet-header/outlet-header";
import { Footer } from "../../component/footer/footer";

@Component({
  selector: 'app-main-out-let',
  imports: [RouterOutlet, OutletHeader, Footer],
  templateUrl: './main-out-let.html',
  styleUrl: './main-out-let.scss',
})
export class MainOutLet {

}
