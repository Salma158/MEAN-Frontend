import { Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AllAuthorsComponent } from './all-authors/all-authors.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { CategoryBooksComponent } from './category-books/category-books.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { PopularComponent } from './components/popular/popular.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { roleGuard } from './guards/role.guard';
import { authGuard } from './guards/auth.guard';
import { BookReviewComponent } from './components/book-review/book-review.component';

export const routes: Routes = [
    {
        path: 'categories',
        component: AllCategoriesComponent,
        data: { title: 'Categories' }
    },
    {
        path: 'books',
        component: AllBooksComponent,
        data: { title: 'Books' }
    },
    {
        path: 'authors',
        component: AllAuthorsComponent,
        data: { title: 'Authors' }
    },
    {
        path: 'user/authors/:id',
        component: AuthorDetailsComponent,
        data: { title: 'Author Details' }
    },
    {
        path: 'book-details/:id/categories/:id',
        component: CategoryBooksComponent,
        data: { title: 'Category Details' }
    },
    {
        path: 'book-details/:id',
        component: BookDetailsComponent,
        data: { title: 'Book Details' }
    },
    {
        path: '',
        component: HomePageComponent,
        data: { title: 'Home' }
    },
    {
        path: 'user-profile',
        component: UserProfileComponent,
        data: { title: 'User Profile' }
    },
    {
        path: 'admin',
        component: AdminLoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { title: 'Dashboard' }
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'log-in',
        component: LogInComponent
    },
    {
        path: 'book-details/:id/book-review/:userId',
        component: BookReviewComponent,
        title : "write review"
    },
    {
        path: '**',
        component: NotFoundComponent,
        data: { title: 'Not Found' }
    }
];
