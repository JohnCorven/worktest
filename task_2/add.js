"use strict";
const mySlides = {
  container: document.querySelector(".container"),
  fullScreen:  document.querySelector(".full_screen"),
  fullPicture:  document.querySelector(".full_picture"),
  picture: document.querySelector(".picture"),
  next: document.querySelector(".next"),
  prev: document.querySelector(".prev"),
  arrSlides: [],
  indexSL: [],
  indexCount: 0,

  slidesRun() {
    document.querySelectorAll(".src_circle").forEach((el) => {
      this.indexSL.push(el);
    });

    document.querySelectorAll(".slide").forEach((el) => {
      this.arrSlides.push(el);
    });
  },

  resetsZIndex() {
    this.arrSlides.forEach((el) => {
      el.style.zIndex = "0";
    });
  },
  removeClassAnimatiom() {
    this.arrSlides[this.indexCount].classList.remove("anim_right");
    this.arrSlides[this.indexCount].classList.remove("anim_left");
  },

  slideLeft() {
    this.removeClassAnimatiom();
    this.resetsZIndex();
    this.arrSlides[this.indexCount].style.zIndex = "1";
    this.indexSL[this.indexCount].classList.remove("src_circle_color");
    this.indexCount++;
    if (this.indexCount == this.arrSlides.length) {
      this.indexCount = 0;
    }
    this.arrSlides[this.indexCount].style.zIndex = "2";
    this.arrSlides[this.indexCount].classList.add("anim_right");
    this.indexSL[this.indexCount].classList.add("src_circle_color");
  },

  slideRight() {
    this.removeClassAnimatiom();
    this.resetsZIndex();
    this.arrSlides[this.indexCount].style.zIndex = "1";
    this.indexSL[this.indexCount].classList.remove("src_circle_color");
    this.indexCount--;
    if (this.indexCount < 0) {
      this.indexCount = this.arrSlides.length - 1;
    }
    this.arrSlides[this.indexCount].style.zIndex = "2";
    this.arrSlides[this.indexCount].classList.add("anim_left");
    this.indexSL[this.indexCount].classList.add("src_circle_color");
  },
};

mySlides.slidesRun();

mySlides.indexSL.forEach((el) => {
  el.addEventListener("click", (event) => {
    let i = mySlides.indexSL.indexOf(event.target);
    mySlides.resetsZIndex();
    mySlides.removeClassAnimatiom();
    mySlides.arrSlides[i].style.zIndex = "2";
    mySlides.indexSL[mySlides.indexCount].classList.remove("src_circle_color");
    mySlides.indexCount = i;
    mySlides.indexSL[mySlides.indexCount].classList.add("src_circle_color");
  });
});

mySlides.next.addEventListener("click", () => {
  mySlides.slideLeft();
});
mySlides.prev.addEventListener("click", () => {
  mySlides.slideRight();
});

mySlides.fullScreen.addEventListener("click", () => {
  mySlides.fullPicture.style.display = "flex";
  mySlides.picture.src = mySlides.arrSlides[mySlides.indexCount].src;
})

mySlides.fullPicture.addEventListener("click", () => {
  if(mySlides.fullPicture.style.display == "flex") {
    mySlides.fullPicture.style.display = "none";
  }
})

mySlides.container.addEventListener("mouseover", () => {
  mySlides.next.style.opacity = "1";
  mySlides.prev.style.opacity = "1";
  mySlides.fullScreen.style.opacity = "1";
});
mySlides.container.addEventListener("mouseout", () => {
  mySlides.next.style.opacity = "0";
  mySlides.prev.style.opacity = "0";
  mySlides.fullScreen.style.opacity = "0";
});
