import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Users';
  isLoaded: boolean;

  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
  }
}
