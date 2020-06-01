import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../dto/post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOption =
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.postsUrl);
  }

  savePost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.postsUrl, post, this.httpOption);
  }

}
