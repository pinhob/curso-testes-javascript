import find from "lodash/find";
import remove from "lodash/remove";

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
    return this.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
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
