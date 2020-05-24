import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/dto/user-dto';
import { Address } from 'src/app/dto/address-dto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  showExtended = false;
  loaded = false;
  enableAdd = true;

  constructor() { }

  ngOnInit() {
    this.users = [
      new User('John', 'Deo', 70, true, new Date('03/11/2017 06:20:00'), false, new Address('50 Main st', 'Boston', 'MA')),
      new User('Karen', 'Thomas', 70, true, new Date('01/04/2017 06:20:00'), true, new Address('20 Main st', 'Boston', 'FL')),
      new User('Navya', 'Williams', 31, true, new Date('01/04/2019 06:20:00'), true, new Address('20 Main st', 'Boston', 'MN'))];
    this.loaded = true;
    this.showExtended = true;
  }
  addUser(user: User) {
    this.users.push(user);
  }

  toggleUser(user: User) {
    user.hide = !user.hide;
  }


}
