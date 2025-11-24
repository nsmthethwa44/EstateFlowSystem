import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
gallery=[
  "assets/img/gallery-1.jpg",
  "assets/img/gallery-2.jpg",
  "assets/img/gallery-3.jpg",
  "assets/img/gallery-4.jpg",
  "assets/img/gallery-5.jpg",
  "assets/img/gallery-6.jpg",
]
}
