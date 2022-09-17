"use strict";
let myLi = document.querySelectorAll(".header-list-item");
myLi.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    e.target.style.color = "#fff";
  });
});
myLi.forEach((el) => {
  el.addEventListener("mouseout", (e) => {
    e.target.style.color = "#001a7c";
  });
});

let task_1 = document.querySelector(".but-task-1");
let task_2 = document.querySelector(".but-task-2");
let task_3 = document.querySelector(".but-task-3");
let blockTaskOne = document.querySelector(".main-task-one");
let blockTaskTwo = document.querySelector(".main-task-two");
let blockTaskThree = document.querySelector(".main-task-three");

task_1.addEventListener("click", () => {
  blockTaskOne.style.display = "block";
  blockTaskTwo.style.display = "none";
  blockTaskThree.style.display = "none";
});
task_2.addEventListener("click", () => {
  blockTaskOne.style.display = "none";
  blockTaskTwo.style.display = "block";
  blockTaskThree.style.display = "none";
});
task_3.addEventListener("click", () => {
  blockTaskOne.style.display = "none";
  blockTaskTwo.style.display = "none";
  blockTaskThree.style.display = "block";
});