import { Component, Input } from '@angular/core';
import { AuthorsRequestsService } from '../services/authors-requests.service';
import { Book } from '../interfaces/books';
import { Author } from '../interfaces/author';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  books !: Array<Book>;
  authorData ?: Author;
  @Input() id!: string;
  constructor(private authorsRequests: AuthorsRequestsService, private route: ActivatedRoute ){}
  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.authorsRequests.getAuthorDetails(id).subscribe(
      (res: any) => { 
        console.log(res)
        this.books = res.books ;
        this.authorData = res.author;
        console.log(this.authorData)
      }
       );
}
}
