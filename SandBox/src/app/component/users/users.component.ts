import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/dto/user-dto';
import { Address } from 'src/app/dto/address-dto';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user = new User(null, null, 0, true, null, false, new Address(null, null, null));
  users: User[];
  showExtended: boolean;
  loaded = false;
  enableAdd = true;
  showUserForm: boolean;
  autoComplete: 'on';

  constructor(private userService: userService) { }

  ngOnInit() {
    this.setUsersData();
    this.loaded = true;
    this.showExtended = true;
    this.userService.getData().subscribe(data => {
      console.log(data);
    });
  }

  setUsersData() {
    this.users = this.userService.getUsers();
  }
  addUser() {
    this.user.hide = false;
    this.user.isActive = true;
    this.userService.addUser(this.user);
    this.showUserForm = false;

  }

  toggleUser(user: User) {
    user.hide = !user.hide;
  }

}
