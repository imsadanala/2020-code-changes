import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/dto/post-dto';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(postArray => {
      this.posts = postArray;
    });
  }

  newPost(post: Post) {
    this.posts.unshift(post);
  }
}
