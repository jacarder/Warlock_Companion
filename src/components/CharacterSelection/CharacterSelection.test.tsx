import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterSelection from './CharacterSelection';

describe('<CharacterSelection />', () => {
  test('it should mount', () => {
    render(<CharacterSelection />);
    
    const characterSelection = screen.getByTestId('CharacterSelection');

    expect(characterSelection).toBeInTheDocument();
  });
});