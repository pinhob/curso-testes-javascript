import find from "lodash/find";
import remove from "lodash/remove";
import Dinero from "dinero.js";

const Money = Dinero;

Money.defaultCurrency = "BRL";
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  add(item) {
    let itemToFind = { product: item.product };
    const itemAlreadyInCart = find(this.items, itemToFind);

    if (itemAlreadyInCart) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, item) => acc.add(Money({ amount: item.product.price * item.quantity })), Money({ amount: 0 }))
  };

  summary() {
    const total = this.getTotal();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  };
};
