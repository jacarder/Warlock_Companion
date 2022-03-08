import { TextField, Box, Typography, Divider, styled, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { FC, useContext, useEffect, useState } from 'react';
import MuiGrid from '@mui/material/Grid';
import { ICharacterData, ICharacterSkill, ISkill } from '../../models/character.model';
import PlayerService from '../../services/PlayerService';
import { AuthContext } from '../../config/auth-context';
import * as uuid from 'uuid';
import SkillService from '../../services/SkillService';
import { unionBy, merge, uniqBy } from 'lodash';
import FormInput from '../FormInput/FormInput';

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
  const [skills, setSkills] = useState<{group1: ICharacterSkill[] | ISkill[], group2: ICharacterSkill[] | ISkill[]} | undefined>(undefined);
  const auth = useContext(AuthContext);
  const userId = auth.user?.uid as string;
  useEffect(() => {
    const skillList = SkillService.getSkillList().sort();
    const characterSkillList = merge((character?.skills || []), skillList) as ICharacterSkill[];
    const middle = Math.ceil(skillList.length / 2);
    setSkills({
      group1: [...characterSkillList.slice(0, middle)],
      group2: [...characterSkillList.slice(middle)]
    }) 
    //  TODO find out why we can't look at properties of objects to call useEffect
  }, [])
  
  useEffect(() => {
    PlayerService.getPlayerCharacterData(userId, characterId).then((data) => {  
      setCharacter(data);
    });
  }, [characterId])

  const createFormCheckBox = (displayName: string, name: string) => {
    const charSkill = character?.skills?.find((skill) => skill.name === name)
    const checkboxIdName = `${name}-checkbox`,
    inputIdName = name,
    checked = charSkill?.isChecked ? charSkill?.isChecked : false,
    level = charSkill?.level ? charSkill?.level : 0;
    return (
      <>      
        <Grid item xs={10} md={'auto'}>
          <FormControlLabel 
            control={
              <Checkbox 
                id={checkboxIdName} 
                name={checkboxIdName}
                checked={checked}
                onChange={handleSkillCheckboxChange}
              />} 
            label={displayName} 
            sx={{overflowWrap: 'anywhere'}}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField 
            id={inputIdName}
            fullWidth
            name={inputIdName}
            value={level}
            onChange={handleSkillInputChange}
            type={'number'}
          />
        </Grid>
      </>
    )
  }

  const createSkillList = (skillList: ICharacterSkill[] | ISkill[] | undefined) => {
    return (
      <> 
        {
          skillList?.length ?
          skillList?.map((skill) => {
            return (
              <Grid key={skill.name} container direction="row" alignItems="center" justifyContent={'space-between'}>
                {createFormCheckBox(skill.displayName, skill.name)}
              </Grid>
            )
          }) : null          
        }
      </>
    )
  }

  const handleInputChange = (name: string, value: string | number) => {
    setCharacter({
      ...character,
      skills: [...character?.skills || []],
      [name]: value
    });
  } 

  const handleSkillInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    const skill = {
      name: name,
      level: +value,
      //isChecked: true //  TODO get checkbox based on name-checkbox
    } as ICharacterSkill;
    const existingCharSkill = character?.skills?.find((charSkill) => charSkill.name === skill.name);
    const combinedSkill = merge(existingCharSkill, skill);
    setCharacter({
      ...character,
      skills: unionBy((character?.skills || []), [combinedSkill], 'name')
    });
  }

  const handleSkillCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const groupName = name.replace('-checkbox', '');
    const existingCharSkill = character?.skills?.find((charSkill) => charSkill.name === groupName);
    const skill = {
      name: groupName,
      level: existingCharSkill?.level || 0,
      isChecked: checked
    };
    const combinedSkill = merge(existingCharSkill, skill);
    setCharacter({
      ...character,
      skills: unionBy((character?.skills || []), [combinedSkill], 'name')
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
          <FormInput name="Name" formControlName="name" value={character?.name} onInputChange={handleInputChange}/>
          <FormInput name="Community" formControlName="community" value={character?.community} onInputChange={handleInputChange}/>
          <FormInput name="Career" formControlName="career" value={character?.career} onInputChange={handleInputChange}/>
          <FormInput name="Past Careers" formControlName="pastCareers" value={character?.pastCareers} onInputChange={handleInputChange}/>
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
          <FormInput name="Background" formControlName="background" value={character?.background} multilineRows={10} onInputChange={handleInputChange}/>
        </Grid>
        <Grid item xs={5}>
          <FormInput name="Stamina" formControlName="stamina" value={character?.stamina} onInputChange={handleInputChange}/>
        </Grid> 
        <Grid item xs={2}>
          {/* spacing added between two fields */}
        </Grid>               
        <Grid item xs={5}>
          <FormInput name="Luck" formControlName="luck" value={character?.luck} onInputChange={handleInputChange}/>          
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
