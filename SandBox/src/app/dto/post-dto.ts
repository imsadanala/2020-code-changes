export class Post {
  public id?: number;
  public title?: string;
  public body?: string;
  constructor(title?: string, body?: string, id?: number) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}
