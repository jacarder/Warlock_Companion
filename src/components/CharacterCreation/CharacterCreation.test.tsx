import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterCreation from './CharacterCreation';

describe('<CharacterCreation />', () => {
  test('it should mount', () => {
    render(<CharacterCreation />);
    
    const characterCreation = screen.getByTestId('CharacterCreation');

    expect(characterCreation).toBeInTheDocument();
  });
});