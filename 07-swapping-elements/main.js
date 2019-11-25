function init() {
  checkCart();
  let stockList = document.querySelector(".list");
  let cartList = document.querySelector(".cart");
  let button = document.querySelector("button");

  stockList.addEventListener("click", function(e) {
    let index = Array.prototype.slice
      .call(document.getElementById("stock_list").children)
      .indexOf(e.target);
    checkList(e, index);
  });

  cartList.addEventListener("click", function(e) {
    let index = Array.prototype.slice
      .call(document.getElementById("cart_list").children)
      .indexOf(e.target);
    updateStock(e, index, "stock");
  });

  button.addEventListener("click", function(e) {
    document.querySelector(".cart").innerHTML = "";
    let arr = getLocalStorage("all");
    for (var i = 0; i < arr.length; i++) {
      localStorage.removeItem(arr[i]);
    }
    document.querySelector("#cart h2").innerText = "Cart (0)";
  });
}

function checkCart() {
  document.querySelector(".list").innerHTML = "";
  fetch("data.json")
    .then(response => response.json())
    .then(json => {
      let stock_li = "";
      let cart_li = "";
      let tot_qty = 0;
      for (var stk in json.data.stock) {
        if (localStorage.getItem(json.data.stock[stk].item) === null) {
          localStorage.setItem(
            json.data.stock[stk].item,
            json.data.stock[stk].qty
          );
        }
        if (localStorage.getItem(json.data.stock[stk].item) != 0) {
          stock_li +=
            "<li>" +
            json.data.stock[stk].item +
            "(" +
            localStorage.getItem(json.data.stock[stk].item) +
            ")</li>";
        }

        if (
          localStorage.getItem("cart_" + json.data.stock[stk].item) &&
          localStorage.getItem("cart_" + json.data.stock[stk].item) != 0
        ) {
          cart_li +=
            "<li>" +
            json.data.stock[stk].item +
            "(" +
            localStorage.getItem("cart_" + json.data.stock[stk].item) +
            ")</li>";
          tot_qty += Number(
            localStorage.getItem("cart_" + json.data.stock[stk].item)
          );
        }
      }
      document.querySelector(".list").innerHTML = stock_li;
      document.querySelector(".cart").innerHTML = cart_li;
      document.querySelector("#cart h2").innerText = "Cart (" + tot_qty + ")";
    });
}

function checkList(e, index) {
  index = index + 1;
  let itemName = e.target.innerText.split("(")[0];
  let get_item = localStorage.getItem(itemName);

  if (get_item >= 1) {
    let stock_label = document.querySelector(
      ".list li:nth-child(" + index + ")"
    );
    let get_stock_label = stock_label.innerText;
    let stock_qty = get_stock_label.split("(")[1].slice(0, -1) - 1;
    if (stock_qty > 0) {
      let updated_stock_label =
        get_stock_label.split("(")[0] + "(" + stock_qty + ")";
      stock_label.innerText = updated_stock_label;
    } else {
      document.querySelector(".list li:nth-child(" + index + ")").remove();
      localStorage.setItem(
        "stock_" + itemName,
        Number(localStorage.getItem("cart_" + itemName)) + 1
      );
    }

    localStorage.setItem(
      "cart_" + itemName,
      Number(localStorage.getItem("cart_" + itemName)) + 1
    );

    localStorage.setItem(itemName, stock_qty);
    checkItem(
      itemName,
      localStorage.getItem("cart_" + itemName),
      "add",
      "cart"
    );
  }
}

function checkItem(item, qty, type, parent) {
  if (qty == 1 && type == "add") {
    if (parent == "stock") {
      localStorage.setItem(
        "cart_" + item,
        Number(localStorage.getItem("cart_" + item)) - 1
      );
    }
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(item + "(" + qty + ")"));
    document.querySelector("#" + parent + " ul").appendChild(li);
  } else {
    let cartId = document.querySelector("#" + parent + " ul");
    var listItem = cartId.getElementsByTagName("li");
    for (i = 0; i < listItem.length; i++) {
      a = listItem[i];
      txtValue = a.textContent || a.innerText;
      if (txtValue.split("(")[0] == item) {
        listItem[i].innerText = item + "(" + qty + ")";
      }
    }
  }

  let arr = getLocalStorage("cart");
  let tot_qty = 0;
  for (var i = 0; i < arr.length; i++) {
    tot_qty += Number(localStorage.getItem(arr[i]));
  }
  document.querySelector("#cart h2").innerText = "Cart (" + tot_qty + ")";
}

function getLocalStorage(key) {
  var arr = [];
  for (var i = 0; i < localStorage.length; i++) {
    if (key != "all") {
      if (localStorage.key(i).substring(0, 5) == "cart_") {
        arr.push(localStorage.key(i));
      }
    } else {
      arr.push(localStorage.key(i));
    }
  }
  return arr;
}

function updateStock(e, index) {
  index = index + 1;
  let stockList = document.getElementById("stock_list").children;
  let cartText = e.target.innerText.split("(")[0];
  if (localStorage.getItem(cartText) != 0) {
    for (i = 0; i < stockList.length; i++) {
      let stockText = stockList[i].innerText.split("(")[0];
      let stockQty = Number(stockList[i].innerText.split("(")[1].slice(0, -1));
      if (stockText == cartText) {
        let stock_qty = stockQty + 1;
        stockList[i].innerText = stockText + "(" + stock_qty + ")";
        localStorage.setItem(
          "cart_" + stockText,
          Number(localStorage.getItem("cart_" + stockText)) - 1
        );
        localStorage.setItem(stockText, stock_qty);
        if (localStorage.getItem("cart_" + stockText) > 0) {
          checkItem(
            stockList[i].innerText.split("(")[0],
            localStorage.getItem("cart_" + stockText),
            "remove",
            "cart"
          );
        } else {
          document.querySelector(".cart li:nth-child(" + index + ")").remove();
          checkItem(
            stockList[i].innerText.split("(")[0],
            localStorage.getItem("cart_" + stockText),
            "remove",
            "cart"
          );
        }
      }
    }
  } else {
    checkItem(cartText, 1, "add", "stock");
    localStorage.setItem(cartText, Number(localStorage.getItem(cartText)) + 1);
  }
}

init();
