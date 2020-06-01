export class Post {
  public id?: number;
  public tittle: string;
  public body: string;
  constructor(tittle: string, body: string, id?: number) {
    this.id = id;
    this.tittle = tittle;
    this.body = body;
  }
}
