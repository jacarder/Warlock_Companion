import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { ICharacter } from '../../models/character.model';
import PlayerService from '../../services/PlayerService';

interface CharacterSelectionProps {}

const CharacterSelection: FC<CharacterSelectionProps> = () => {
  const [characterList, setCharacterList] = useState<ICharacter[] | null>(null)
  useEffect(() => {
    PlayerService.getPlayerCharacters().then((characters) => {
      setCharacterList(characters);
    }).catch(() => {
      setCharacterList(null);
    });
  }, [])
  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log(event.target)
  }
  return (
    <Box sx={{ width: '25%' }}>
      <FormControl fullWidth>
        <InputLabel>Character</InputLabel>
        <Select
          labelId="character-selection-label-id"
          id="character-selection-id"
          label="Character"
          onChange={handleSelectChange}
        >
          {characterList?.map((character) => {
            return (
              <MenuItem value={character.id}>{character.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default CharacterSelection;
