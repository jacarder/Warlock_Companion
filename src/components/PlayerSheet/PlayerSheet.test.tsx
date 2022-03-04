import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PlayerSheet from './PlayerSheet';

describe('<PlayerSheet />', () => {
  test('it should mount', () => {
    render(<PlayerSheet />);
    
    const playerSheet = screen.getByTestId('PlayerSheet');

    expect(playerSheet).toBeInTheDocument();
  });
});