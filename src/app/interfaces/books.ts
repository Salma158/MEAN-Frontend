import { Author } from "./author";
import { Category } from "./category";

export interface Book {
    _id: string;
    author: Author;
    category: Category; 
    name: string;
    image: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'already read' | 'wish to read' | 'currently reading';
    avgRating: Number;
    review: string;
}