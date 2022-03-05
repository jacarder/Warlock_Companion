import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { ICharacter } from '../../models/character.model';
import PlayerService from '../../services/PlayerService';

interface CharacterSelectionProps {
  onSelectionChange: (characterId: string) => void
}

const CharacterSelection: FC<CharacterSelectionProps> = ({onSelectionChange}) => {
  const [characterList, setCharacterList] = useState<ICharacter[] | null>(null)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('1')
  useEffect(() => {
    PlayerService.getPlayerCharacters().then((characters) => {
      setCharacterList(characters);
      onSelectionChange(selectedCharacterId);
    }).catch(() => {
      setCharacterList(null);
    });
  }, [])
  const handleSelectChange = (event: SelectChangeEvent) => {
    const id = event.target.value;
    setSelectedCharacterId(id)
    onSelectionChange(id);
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} sx={{mb: 3}}> 
        <FormControl fullWidth >
          <InputLabel>Character</InputLabel>
          <Select
            labelId="character-selection-label-id"
            id="character-selection-id"
            label="Character"
            value={selectedCharacterId}
            onChange={handleSelectChange}
          >
            {characterList?.map((character) => {
              return (
                <MenuItem key={character.id} value={character.id}>{character.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CharacterSelection;
