import { Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { PopularComponent } from './components/popular/popular.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BookReviewComponent } from './components/book-review/book-review.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';

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
},{
    path:'admin',
    component:AdminLoginComponent
},
{
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[authGuard,roleGuard]

},
{
    path:'sign-up',
    component:SignUpComponent,
},
{
    path:'log-in',
    component:LogInComponent
}

];