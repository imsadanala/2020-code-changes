export class Address {
  street?: string;
  city?: string;
  state?: string;

  constructor(street: string, city: string, state: string) {
    this.city = city;
    this.state = state;
    this.street = street;
  }
}
