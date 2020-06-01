import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/dto/post-dto';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  @Output() newPost = new EventEmitter<Post>();
  @Input() currentPost = new Post();
  postButton = 'Add Post';



  constructor(private postService: PostService) { }

  ngOnInit() {
    if(this.currentPost !== null) {
      this.postButton = 'Update Post';
    }
  }
  addPost(title: string, body: string) {
    if (!title || !body) {
      alert('Hello Dude please enter details');
    } else {
      this.postService.savePost(new Post(title, body)).subscribe(post => {
        this.newPost.emit(post);
      });
    }
  }
}
