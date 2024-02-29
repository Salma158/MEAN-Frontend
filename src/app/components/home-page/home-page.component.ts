import { Component } from '@angular/core';
import { PopularComponent } from '../popular/popular.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponent, PopularComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
