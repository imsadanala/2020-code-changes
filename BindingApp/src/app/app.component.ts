import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  serverElements = [{ type: 'Server', name: 'Test Server', content: 'Just a Test Server!!' }];
}
