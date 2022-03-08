import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormInput from './FormInput';

describe('<FormInput />', () => {
  test('it should mount', () => {
    //render(<FormInput />);
    
    const formInput = screen.getByTestId('FormInput');

    expect(formInput).toBeInTheDocument();
  });
});