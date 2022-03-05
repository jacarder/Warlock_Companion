import { TextField, Box, Typography, Divider, styled } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import MuiGrid from '@mui/material/Grid';
import { ICharacterData } from '../../models/character.model';
import PlayerService from '../../services/PlayerService';

interface CharacterInfoProps {
  characterId: string
}

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const CharacterInfo: FC<CharacterInfoProps> = ({characterId}) => {
  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  useEffect(() => {
    PlayerService.getPlayerCharacterData(characterId).then((data) => {
      setCharacter(data);
    });
  }, [characterId])
  
  const createFormField = (name: string, value: string | number | undefined = '', multilineRows: number = 1) => {
    const id = name.replace('', '-').toLowerCase();
    return (
      <TextField 
        id={id}
        label={name}
        multiline={multilineRows ? true : false}
        maxRows={multilineRows}
        fullWidth
        value={value || ''}
      />
    )
  }
  return (
    <Box 
      component="form"
      sx={{
        //ml: 3,

        '& .MuiTextField-root': { mb: 1, mt: 1 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{alignItems: 'center'}}>
          <Typography variant="h4" component="div">
            Character Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
            {createFormField("Name", character?.name)}
            {createFormField("Community", character?.community)}
            {createFormField("Career", character?.career)}
            {createFormField("Past Careers", character?.pastCareers, 4)}
        </Grid>
        {/* TODO Make divider responsive 
        <Divider orientation="vertical" flexItem>
          Character
        </Divider>*/}
        <Grid item xs={2}>
          {/* TODO Make divider responsive*/}
          <Box sx={{ 
            borderLeft: 1, 
            height: '100%', 
            width: '0px', 
            alignSelf: 'center', 
            marginRight: '50%', 
            marginLeft: 'auto',
            borderColor: 'rgba(0, 0, 0, 0.12)'
          }}/>
        </Grid>          
        <Grid item xs={12} md={5}>
          {createFormField("Background", character?.background, 10)}
        </Grid>
        <Grid item xs={5}>
          {createFormField("Stamina", character?.stamina)}
        </Grid> 
        <Grid item xs={2}>
          {/* spacing added between two fields */}
        </Grid>               
        <Grid item xs={5}>
          {createFormField("Luck", character?.luck)}
        </Grid>                
        <Grid item xs={12} md={6}>
          <Divider>Skills</Divider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Divider>Skills</Divider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterInfo;
