import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterInfo from './CharacterInfo';

describe('<CharacterInfo />', () => {
  test('it should mount', () => {
    render(<CharacterInfo characterId=''/>);
    
    const characterInfo = screen.getByTestId('CharacterInfo');

    expect(characterInfo).toBeInTheDocument();
  });
});