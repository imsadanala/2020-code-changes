import { Address } from './address-dto';


export class User {

  firstName: string;
  lastName: string;
  age?: number;
  isActive; boolean;
  registered?: Date;
  address?: Address;
  hide?: boolean;

  constructor(firstName: string, lastName: string, age: number, isActive: boolean, registered: Date, hide: boolean, address: Address) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
    this.isActive = isActive;
    this.registered = registered;
    this.hide = hide;
  }

}
