import { Injectable } from '@angular/core';
import { User } from '../dto/user-dto';
import { Address } from '../dto/address-dto';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userService {

  users: User[];
  observableData: Observable<any>;

  constructor() {
    this.users = [
      new User('John', 'Deo', 70, true, new Date('03/11/2017 06:20:00'), false, new Address('50 Main st', 'Boston', 'MA')),
      new User('Karen', 'Thomas', 70, true, new Date('01/04/2017 06:20:00'), true, new Address('20 Main st', 'Boston', 'FL')),
      new User('Navya', 'Williams', 31, true, new Date('01/04/2019 06:20:00'), true, new Address('20 Main st', 'Boston', 'MN'))];
  }

  public getUsers(): User[] {
    return this.users;
  }

  public addUser(user) {
    this.users.unshift(user);
    console.log(this.users);
  }

  getData() {
    return this.observableData = new Observable<any>(observable => {
      setTimeout(() => { observable.next(1) }, 1000),
        setTimeout(() => { observable.next(2) }, 2000),
        setTimeout(() => { observable.next({ name: 'SSS' }) }, 3000)
    });
  }

}
