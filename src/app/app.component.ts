import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { HeaderComponent } from './components/header/header.component';
import { PopularComponent } from './components/popular/popular.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserProfileComponent, BookDetailsComponent, HeaderComponent, PopularComponent, HomeComponent, PopularComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MEAN-Frontend';
}
