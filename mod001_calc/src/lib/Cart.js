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

  checkout() {
    return {
      total: this.getTotal(),
      items: this.items
    };
  };
};
