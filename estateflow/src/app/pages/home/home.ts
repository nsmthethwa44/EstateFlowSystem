import { Component } from '@angular/core';
import { Hero } from "../../sections/hero/hero";
import { Featured } from "../../sections/featured/featured";
import { Services } from "../../sections/services/services";
import { Gallery } from "../../sections/gallery/gallery";
import { TopRated } from "../../sections/top-rated/top-rated";
import { Reviews } from "../../sections/reviews/reviews";
import { Agents } from "../../sections/agents/agents";
import { Blog } from "../../sections/blog/blog";

@Component({
  selector: 'app-home',
  imports: [Hero, Featured, Services, Gallery, TopRated, Reviews, Agents, Blog],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
