import { Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { PopularComponent } from './components/popular/popular.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BookReviewComponent } from './components/book-review/book-review.component';

export const routes: Routes = [ {
    path:"book-details/:id",
    component: BookDetailsComponent,
    title: "book details"
}, {
    path:"",
    component: HomePageComponent,
    title: "home"
}, {
    path:"user-profile",
    component: UserProfileComponent,
    title: "user profile"
},{
    path:"book-details/:bookId/book-review/:id",
    component: BookReviewComponent,
    title: "user book review"
}];
