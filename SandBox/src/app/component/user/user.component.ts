import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/dto/user-dto';
import { Address } from 'src/app/dto/address-dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User;

  constructor() { }

  ngOnInit() {
    this.user = null;
    //new User('Suresh', 'Sadanala', 25, true, new Date(), new Address('Shivalayam street', 'PSP', 'AP'));
  }
}
