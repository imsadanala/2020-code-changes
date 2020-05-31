import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { UsersComponent } from './component/users/users.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { userService } from './services/user.service';
import { PostsComponent } from './component/posts/posts.component';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    NavBarComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [userService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
