import { TextField, Box, Typography, Divider, styled, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { FC, useContext, useEffect, useState } from 'react';
import MuiGrid from '@mui/material/Grid';
import { ICharacterData, ISkill } from '../../models/character.model';
import PlayerService from '../../services/PlayerService';
import { AuthContext } from '../../config/auth-context';
import * as uuid from 'uuid';
import SkillService from '../../services/SkillService';

interface CharacterInfoProps {
  characterId: string,
  onSave: (characterId: string) => void
}

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

const CharacterInfo: FC<CharacterInfoProps> = ({characterId, onSave}) => {
  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const [skills, setSkills] = useState<{group1: ISkill[], group2: ISkill[]} | undefined>(undefined);
  const auth = useContext(AuthContext);
  const userId = auth.user?.uid as string;
  useEffect(() => {
    let skillList = SkillService.getSkillList();
    const middle = Math.ceil(skillList.length / 2);
    console.dir(
      {
        group1: [...skillList.slice(0, middle)],
        group2: [...skillList.slice(middle)]
      }
    )
    setSkills({
      group1: [...skillList.slice(0, middle)],
      group2: [...skillList.slice(middle)]
    })
  }, [])
  
  useEffect(() => {
    PlayerService.getPlayerCharacterData(userId, characterId).then((data) => {
      setCharacter(data);
    });
  }, [characterId])
  
  const createFormField = (
    name: string | null, 
    formControlName: string, 
    value: string | number | undefined = '', 
    multilineRows: number = 1,
    type: React.HTMLInputTypeAttribute = 'text'
  ) => {
    const id = formControlName.replace('', '-').toLowerCase();
    return (
      <TextField 
        id={id}
        label={name}
        multiline={multilineRows ? true : false}
        maxRows={multilineRows}
        fullWidth
        name={formControlName}
        value={value || ''}
        onChange={handleFormChange}
        type={type}
      />
    )
  }

  const createFormCheckBox = (label: string, formControlName: string, isChecked: boolean, value: string | number | undefined = '') => {
    const id = label.replace('', '-').toLowerCase(),
    checkboxName = `${formControlName}-checkbox`,
    inputName = `${formControlName}-input`
    return (
      <>      
        <Grid item xs={'auto'}>
          <FormControlLabel 
            control={
              <Checkbox 
                id={id} 
                name={checkboxName}
                checked={isChecked}
              />} 
            label={label} 
            sx={{overflowWrap: 'anywhere'}}
          />
        </Grid>
        <Grid item xs={2}> 
          {createFormField(null, inputName, value, 1, 'number')}
        </Grid>
      </>
    )
  }

  const createSkillList = (skillList: ISkill[] | undefined) => {
    return (
      <> 
        {
          skillList?.length ?
          skillList?.map((skill) => {
            return (
              <Grid key={skill.label} container direction="row" alignItems="center" justifyContent={'space-between'}>
                {createFormCheckBox(skill.label, skill.formControlName, true, 1)}
              </Grid>
            )
          }) : null          
        }
      </>
    )
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setCharacter({
      ...character,
      [name]: value
    });
  } 

  const handleSubmit = () => {
    
    const charId = characterId ? characterId : uuid.v4()
    PlayerService.savePlayerCharacter(
      userId, 
      charId,
      ({
        ...character,
        id: charId
      } as ICharacterData)
    );
    onSave(charId)
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
            {createFormField("Name", "name", character?.name)}
            {createFormField("Community", "community", character?.community)}
            {createFormField("Career", "career", character?.career)}
            {createFormField("Past Careers", "pastCareers", character?.pastCareers, 4)}
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
          {createFormField("Background", "background", character?.background, 10)}
        </Grid>
        <Grid item xs={5}>
          {createFormField("Stamina", "stamina", character?.stamina)}
        </Grid> 
        <Grid item xs={2}>
          {/* spacing added between two fields */}
        </Grid>               
        <Grid item xs={5}>
          {createFormField("Luck", "luck", character?.luck)}
        </Grid>                
        <Grid item xs={12} md={5}>
          <Divider>Skills</Divider>
          {createSkillList(skills?.group1)}
        </Grid>
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
          <Divider>Skills</Divider>
          {createSkillList(skills?.group2)}
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSubmit}>Save Test</Button>
    </Box>
  );
};

export default CharacterInfo;
