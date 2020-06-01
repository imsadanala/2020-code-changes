export class Post {
  public id: number;
  public tittle: string;
  public body: string;
  constructor(id: number, tittle: string, body: string) {
    this.id = id;
    this.tittle = tittle;
    this.body = body;
  }
}
