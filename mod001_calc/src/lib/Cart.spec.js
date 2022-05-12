import Cart from "./Cart";

describe('Cart', () => {
  let cart;
  const product = {
    title: "Adidas Shoes - Men",
    price: 12599
  };

  const product2 = {
    title: "Adidas Shoes - Women",
    price: 12099
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toBe(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toBe(25198);
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

      expect(cart.getTotal().getAmount()).toBe(12599);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toBe(12099);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 2,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 2,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should include formatted amount in the summary', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 2,
      });

      console.log(cart.summary());
      expect(cart.summary().formatted).toEqual('R$493.96');
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 2,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('Special conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(26458);
    });

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(25198);
    });

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(22678);
    });

    it('should NOT apply percentage discount quantity if quantity is equal or below minimun', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(25198);
    });

    it('should apply quantity discount when quantity is equal or below condition', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        product,
        condition,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(12599);
    });

    it('should receive two or more conditions and determine/apply the best discount. First case.', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      }

      cart.add({
        product,
        condition: [condition, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(37797);
    });

    it('should receive two or more conditions and determine/apply the best discount. Second case.', () => {
      const condition = {
        percentage: 80,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      }

      cart.add({
        product,
        condition: [condition, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(12599);
    });
  });
});