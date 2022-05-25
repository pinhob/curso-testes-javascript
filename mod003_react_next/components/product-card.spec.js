import { screen, render } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image: "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
}

describe('ProductCard', () => {
  it('should render ProductCard', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument()
  });

  it('should display proper content', () => {
    render(<ProductCard product={product} />);

    const title = screen.getByText(new RegExp(product.title, 'i'));
    const price = screen.getByText(new RegExp(product.price, 'i'));
    const image = screen.getByTestId('image');

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(image).toHaveStyle({
      backgroundImage: product.image,
    });
  });


});
