import { v4 as uuidv4 } from 'uuid'

export class Todo {
  name: string = "";
  done: boolean = false;
  id: string = "";

  fromObj(o: {name: string, done: boolean, id?: string}) {
    this.name = o.name ? o.name : "";
    this.done = o.done ? Boolean(o.done) : false;
    this.id = o.id ? o.id : uuidv4();

    return this;
  }
}