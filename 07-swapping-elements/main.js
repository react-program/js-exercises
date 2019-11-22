const initialData = {
  apple: 5,
  grapes: 6,
  orange: 3
};

const model = {
  stock: {},
  cart: {},
  display() {
    console.log("Stock");
    console.table(model.stock);
    console.log("Cart");
    console.table(model.cart);
  },
  init() {
    model.stock = { ...initialData };
    model.display();
  },
  addCart(item) {
    if (model.stock[item] > 0) {
      model.stock[item] = model.stock[item] - 1;
      model.cart[item] = model.cart[item] ? model.cart[item] + 1 : 1;
    }
    model.display();
  },
  removeCart(item) {
    if (model.cart[item] > 0) {
      model.stock[item] = model.stock[item] + 1;
      model.cart[item] = model.cart[item] - 1;
    }
    model.display();
  },
  clearCart() {
    model.stock = { ...initialData };
    model.cart = {};
    model.display();
  }
};

const view = {
  render({ stock, cart }) {
    this.renderStock(stock);
    this.renderCart(cart);
    this.renderTotal(cart);
  },
  attachHandlers({ add, remove, clear }) {
    document.body.addEventListener(
      "click",
      event => {
        if (event.target.matches(".stock li")) {
          add(event.target.getAttribute("data-name"));
        } else if (event.target.matches(".cart li")) {
          remove(event.target.getAttribute("data-name"));
        } else if (event.target.matches("button")) {
          clear();
        }
      },
      { once: true }
    );
  },
  renderStock(stock) {
    const ul = document.querySelector(".stock");
    ul.innerHTML = "";
    Object.entries(stock).forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `${item[0]} (${item[1]})`;
      li.setAttribute("data-name", item[0]);
      ul.appendChild(li);
    });
  },
  renderCart(cart) {
    const ul = document.querySelector(".cart");
    ul.innerHTML = "";
    Object.entries(cart).forEach(item => {
      if (item[1] > 0) {
        const li = document.createElement("li");
        li.innerHTML = `${item[0]} (${item[1]})`;
        li.setAttribute("data-name", item[0]);
        ul.appendChild(li);
      }
    });
  },
  renderTotal(cart) {
    const cartTotal = document.getElementById("cartTotal");
    const total = Object.entries(cart).reduce(
      (acc, item) => (acc += item[1]),
      0
    );
    cartTotal.innerHTML = `(${total})`;
  }
};

const controller = {
  model: null,
  view: null,
  init(model, view) {
    this.model = model;
    this.view = view;
    model.init();
    this.update();
  },
  addCart(item) {
    model.addCart(item);
    this.update();
  },
  removeCart(item) {
    model.removeCart(item);
    this.update();
  },
  clearCart() {
    model.clearCart();
    this.update();
  },
  update() {
    const model = this.model;
    const view = this.view;
    view.render({ stock: model.stock, cart: model.cart });
    view.attachHandlers({
      add: this.addCart.bind(this),
      remove: this.removeCart.bind(this),
      clear: this.clearCart.bind(this)
    });
  }
};

controller.init(model, view);
