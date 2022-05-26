import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image: "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
}

const renderCartItem = () => {
  render(<CartItem product={product} />);
}

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument()
  });

  it('should display proper content', () => {
    renderCartItem();

    const title = screen.getByText(new RegExp(product.title, 'i'));
    const price = screen.getByText(new RegExp(product.price, 'i'));
    const image = screen.getByTestId('image');

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveAttribute('alt', product.title)
  });

  it('should display 1 as initial quantity', () => {
    renderCartItem();

    const quantity = screen.getByTestId('quantity').textContent;

    expect(quantity).toBe("1")
  });

  it('should increased quantity by 1 when second button is clicked', () => {
    renderCartItem();

    const [_, button] = screen.getAllByRole('button');

    fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decreased quantity by 1 when first button is clicked', () => {
    renderCartItem();

    const [buttonDecrease, buttonIncrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    fireEvent.click(buttonIncrease);

    expect(quantity.textContent).toBe('2');

    fireEvent.click(buttonDecrease);

    expect(quantity.textContent).toBe('1');
  });

  it('should not go below 0 in quantity', () => {
    renderCartItem();

    const [buttonDecrease] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    expect(quantity.textContent).toBe('1');

    fireEvent.click(buttonDecrease);
    fireEvent.click(buttonDecrease);

    expect(quantity.textContent).toBe('0');
  });
});
