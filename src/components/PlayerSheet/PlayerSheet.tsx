import { Box, Divider, styled, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';
import MuiGrid from '@mui/material/Grid';

interface PlayerSheetProps {}

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const PlayerSheet: FC<PlayerSheetProps> = () => {
  const createFormField = (name: string, value: string = '', multilineRows: number = 1) => {
    const id = name.replace('', '-').toLowerCase();
    return (
      <TextField 
        id={id}
        label={name}
        multiline={multilineRows ? true : false}
        maxRows={multilineRows}
        fullWidth
        //value={value}
      />
    )
  }
  return (
    <Box 
      component="form"
      sx={{
        ml: 3,

        '& .MuiTextField-root': { mb: 1, mt: 1 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{alignItems: 'center'}}>
          <Typography variant="h2" gutterBottom component="div">
            Player Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
            {createFormField("Name")}
            {createFormField("Community")}
            {createFormField("Career")}
            {createFormField("Past Careers", '', 4)}
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
          {createFormField("Background", '', 10)}
        </Grid>
        <Grid item xs={5}>
          {createFormField("Stamina", '')}
        </Grid> 
        <Grid xs={2}>
          {/* spacing added between two fields */}
        </Grid>               
        <Grid item xs={5}>
          {createFormField("Luck", '')}
        </Grid>                
        <Grid item xs={12} md={6}>
          <Divider>Skills</Divider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Divider>Skills</Divider>
        </Grid>
      </Grid>
    </Box>
  )
};

export default PlayerSheet;
