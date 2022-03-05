import { Box } from '@mui/material';
import { FC } from 'react';
import CharacterSelection from '../CharacterSelection/CharacterSelection';

interface PlayerSheetProps {}


const PlayerSheet: FC<PlayerSheetProps> = () => {
  
  return (
    <Box component="form">
      <CharacterSelection/>
    </Box>
  )
};

export default PlayerSheet;
