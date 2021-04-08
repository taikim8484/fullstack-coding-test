import { db } from "config/firebase";
import EventEmmiter from "events";

class BlogsEmitter extends EventEmmiter {
  private _unsubcribe;

  constructor() {
    super();
  }
  public subscribe() {
    this._unsubcribe = db.collection("blogs").onSnapshot({
      next: (querySnapshot) => {
        const snapshot = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
        this.emit("data", snapshot);
      },
      error: (error) => this.emit("error", error),
    });
  }
  public unsubcribe() {
    this._unsubcribe && this._unsubcribe();
  }
}

export default BlogsEmitter;
