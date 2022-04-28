import Cart from "./Cart";

describe('Cart', () => {
  let cart;
  const product = {
    title: "Adidas Shoes",
    price: 12599
  };

  beforeEach(() => {
    cart = new Cart();
  });

  it('should return 0 when getTotal() is executed in a newly created instance', () => {
    expect(cart.getTotal()).toBe(0);
  });

  it('should multiply quantity and price and receive the total amount', () => {
    const item = {
      product,
      quantity: 2,
    };

    cart.add(item);

    expect(cart.getTotal()).toBe(25198);
  });

  it('should ensure no more than on product exists at a time', () => {
    cart.add({
      product,
      quantity: 2,
    });

    cart.add({
      product,
      quantity: 1,
    });

    expect(cart.getTotal()).toBe(12599);
  });
});