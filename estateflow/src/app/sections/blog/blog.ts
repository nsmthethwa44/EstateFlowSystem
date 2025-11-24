import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {

  blog= [
    "assets/img/blog-1.jpg",
    "assets/img/blog-2.jpg",
    "assets/img/blog-3.jpg",
    "assets/img/blog-4.jpg",
    "assets/img/blog-5.jpg",
    "assets/img/blog-6.jpg",
  ]
}
