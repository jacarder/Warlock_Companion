import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { ICharacter } from '../../models/character.model';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import CharacterSelection from '../CharacterSelection/CharacterSelection';

interface PlayerSheetProps {}


const PlayerSheet: FC<PlayerSheetProps> = () => {
  const [characterId, setCharacterId] = useState<string>('')
  const handleSelectionChange = (characterId: string) => {
    setCharacterId(characterId);
  }
  const handleOnSave = (characterId: string) => {
    setCharacterId(characterId);
  }
  return (
    <Box component="form">
      <CharacterSelection defaultCharacterId={characterId} onSelectionChange={handleSelectionChange}/>
      <CharacterInfo characterId={characterId} onSave={handleOnSave}/>
    </Box>
  )
};

export default PlayerSheet;
