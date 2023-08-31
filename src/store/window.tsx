import { makeAutoObservable } from "mobx";
class MyWindow {
  innerWidth: number = 0;
  innerHeight: number = 0;
  constructor(width: number, height: number) {
    this.innerWidth = width;
    this.innerHeight = height;
    makeAutoObservable(this);
  }

  resize(width, height) {
    this.innerWidth = width;
    this.innerHeight = height;
  }
}

const myWindow = new MyWindow(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  myWindow.resize(window.innerWidth, window.innerHeight);
});

export default myWindow;
