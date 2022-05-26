import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image: "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
}

const addToCart = jest.fn();

const renderCartItem = () => {
  render(<CartItem product={product} addToCart={addToCart} />);
}

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument()
  });

  fit('should display proper content', () => {
    renderCartItem();

    const title = screen.getByText(new RegExp(product.title, 'i'));
    const price = screen.getByText(new RegExp(product.price, 'i'));
    const image = screen.getByTestId('image');

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveAttribute('alt', product.title)
  });
});
