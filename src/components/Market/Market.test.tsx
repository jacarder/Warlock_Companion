import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Market from './Market';

describe('<Market />', () => {
  test('it should mount', () => {
    render(<Market />);
    
    const market = screen.getByTestId('Market');

    expect(market).toBeInTheDocument();
  });
});