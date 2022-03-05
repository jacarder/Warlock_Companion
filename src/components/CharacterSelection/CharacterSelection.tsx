import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ICharacter } from '../../models/character.model';
import PlayerService from '../../services/PlayerService';
import { AuthContext } from '../../config/auth-context';

interface CharacterSelectionProps {
  defaultCharacterId: string,
  onSelectionChange: (characterId: string) => void
}

const CharacterSelection: FC<CharacterSelectionProps> = ({defaultCharacterId, onSelectionChange}) => {
  const [characterList, setCharacterList] = useState<ICharacter[] | null>(null)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('')
  const auth = useContext(AuthContext);
  const userId = auth.user?.uid as string;
  
  useEffect(() => {
    PlayerService.getPlayerCharacters(userId).then((characters) => {
      setCharacterList(characters);
      setSelectedCharacterId(defaultCharacterId);
      //onSelectionChange(characterId);
    }).catch(() => {
      setCharacterList(null);
    });
  }, [defaultCharacterId])
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
            placeholder='Create New Character'
            value={selectedCharacterId}
            onChange={handleSelectChange}
          >
            <MenuItem key='' value={''}>Create New Character</MenuItem>
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
