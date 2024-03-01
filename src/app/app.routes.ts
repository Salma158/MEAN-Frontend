import { Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AllAuthorsComponent } from './all-authors/all-authors.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { CategoryBooksComponent } from './category-books/category-books.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path:'categories',
        component: AllCategoriesComponent,
        title: 'Categories'
    },
    {
        path:'books',
        component: AllBooksComponent,
        title: 'Books'
    },
    {
        path:'authors',
        component: AllAuthorsComponent,
        title: 'Authors'
    },
    {
        path:'user/authors/:id',
        component: AuthorDetailsComponent,
        title: 'Author Details'
    },
    {
        path:'categories/:id',
        component: CategoryBooksComponent,
        title: 'Category Details'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Not Found'
    }
];
