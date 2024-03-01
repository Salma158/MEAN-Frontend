import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CategoryComponent } from "../category/category.component";
import { BooksComponent } from "../books/books.component";
import { AuthorsComponent } from "../authors/authors.component";
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [TabViewModule,
        TableModule,
        CategoryComponent, BooksComponent, AuthorsComponent]
})
export class DashboardComponent {


}
