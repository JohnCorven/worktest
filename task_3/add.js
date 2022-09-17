"use strict";
class Score {
  constructor() {
    this.headerProducts = document.querySelector(".header-products span");
    this.shoppingCart = document.querySelector(".header-shopping-cart");
    this.btnProduct = document.querySelectorAll(".product-btn");
    this.purchaseBuy = document.querySelectorAll(".product-purchase-buy");
    this.init();
  }
  init() {
    this.headerProducts.addEventListener("click", () => {
      document.querySelector(".products-block").style.display = "flex";
      document.querySelector(".cart-block").style.display = "none";
    });
    this.shoppingCart.addEventListener("click", () => {
      document.querySelector(".products-block").style.display = "none";
      document.querySelector(".cart-block").style.display = "flex";
    });
    this.btnProduct.forEach((el) => {
      el.addEventListener("click", (event) => {
        if (/^Описание$/.test(event.target.innerText)) {
          event.target.innerText = "Отмена";
          event.target.parentNode.querySelector(
            ".product-image"
          ).style.display = "none";
          event.target.parentNode.querySelector(".product-desc").style.display =
            "block";
        } else {
          event.target.innerText = "Описание";
          event.target.parentNode.querySelector(
            ".product-image"
          ).style.display = "block";
          event.target.parentNode.querySelector(".product-desc").style.display =
            "none";
        }
      });
    });
    this.purchaseBuy.forEach((el) => {
      el.addEventListener("click", (event) => {
        let name = event.target
          .closest(".product")
          .querySelector(".product-name").innerText;
        let id = event.target.closest(".product").querySelector(".product-id")
          .children[0].innerText;
        let price = event.target.previousElementSibling.innerText.slice(0, -1);
        let img = event.target.closest(".product").querySelector(".product-image").src;
        let goodBlock = new Cart(id, name, price, img);
        goodBlock.creatingBlockGoods();
        goodBlock.cartDelete();
      });
    });
  }
}

class Cart {
  constructor(id, name, price, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.totalCost = document.querySelector(".total-cart-block span");
    this.sum;
    this.counter;
  }
  configTheQuantityGoods() {
    document.querySelectorAll(".increase-quantity").forEach((el) => {
      let newEl = el.cloneNode(true);
      el.parentNode.appendChild(newEl);
      el.remove();
      newEl.addEventListener("click", (event) => {
        this.increaseQuantity(event);
      });
    });
    document.querySelectorAll(".reduce-quantity").forEach((el) => {
      let newEl = el.cloneNode(true);
      el.parentNode.prepend(newEl);
      el.remove();
      newEl.addEventListener("click", (event) => {
        this.reduceQuantity(event);
      });
    });
  }
  increaseQuantity(event) {
    this.counter = Number(event.target.previousElementSibling.innerText);
    this.counter++;
    if (this.counter >= 10) {
      this.counter = 9;
      return;
    }
    event.target.previousElementSibling.innerText = this.counter;
    let itemPrice = event.target
      .closest(".item-cart")
      .querySelector(".item-cart-prise").innerText;
    this.sum += Number(itemPrice.slice(0, -1));
    this.totalCost.innerText = `${this.sum} $`;
  }
  reduceQuantity(event) {
    this.counter = Number(event.target.nextElementSibling.innerText);
    this.counter--;
    if (this.counter <= 0) {
      this.counter = 1;
      return;
    }
    event.target.nextElementSibling.innerText = this.counter;
    let itemPrice = event.target
      .closest(".item-cart")
      .querySelector(".item-cart-prise").innerText;
    this.sum -= Number(itemPrice.slice(0, -1));
    this.totalCost.innerText = `${this.sum} $`;
  }
  creatingBlockGoods() {
    if (this.checkCart(this.id)) {
      return;
    }
    let text = `<div class="item-cart"><div class="item-cart-img"><img src="${this.img}" alt="картинка" width="100%" height="100%"></div><div class="item-cart-info"><div class="item-cart-name">${this.name}</div><div class="item-cart-id">ID: ${this.id}</div><div class="item-cart-prise">${this.price} $</div></div> <div class="item-cart-quantity"><div class="quantity-control"><div class="reduce-quantity">-</div><div class="counter-quantity">1</div><div class="increase-quantity">+</div></div></div><div class="item-cart-delete"><span>&#9746</span></div></div>`;
    document
      .querySelector(".item-cart-block")
      .insertAdjacentHTML("beforeend", text);
    this.calculateCartAmount();
    this.configTheQuantityGoods();
    this.counterUpdate();
  }
  counterUpdate() {
    let cartBlock = document.querySelector(".item-cart-block");
    let counter = document.querySelector(".header-shopping-counter");
    counter.innerText = cartBlock.children.length;
  }
  cartDelete() {
    document.querySelectorAll(".item-cart-delete span").forEach((el) => {
      let newEl = el.cloneNode(true);
      el.parentNode.appendChild(newEl);
      el.remove();
      newEl.addEventListener("click", (event) => {
        event.target.closest(".item-cart").remove();
        this.calculateCartAmount();
        this.counterUpdate();
      });
    });
  }
  calculateCartAmount() {
    this.sum = 0;
    document.querySelectorAll(".item-cart-prise").forEach((el) => {
      let quantityOfGoods = el
        .closest(".item-cart")
        .querySelector(".counter-quantity").innerText;
      this.sum += Number(el.innerText.slice(0, -1)) * Number(quantityOfGoods);
    });
    this.totalCost.innerText = `${this.sum} $`;
  }
  checkCart(id) {
    if (
      document.querySelector(".item-cart-block").querySelector(".item-cart-id")
    ) {
      let check = false;
      document.querySelectorAll(".item-cart-id").forEach((el) => {
        if (el.innerText === `ID: ${id}`) {
          check = true;
        }
      });
      return check;
    } else {
      return;
    }
  }
}
const score = new Score();
