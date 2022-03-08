import { TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
/**
 * Component created since it was expensive to rerendor onChange of the character property.
 * Therefore, pass value on blur, but always get new value from state of charcter.
 */
interface FormInputProps {
  name: string | null, 
  formControlName: string, 
  value: string | number | undefined, 
  multilineRows?: number,
  type?: React.HTMLInputTypeAttribute,
  onInputChange: (name: string, value: string | number) => void
}

const FormInput: FC<FormInputProps> = ({name, formControlName, value, multilineRows, type, onInputChange}) => {
  const [inputValue, setInputValue] = useState(value)
  useEffect(() => {
    setInputValue(value)
  }, [value])
  
  const id = formControlName.replace('', '-').toLowerCase();
  const handleFormChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    onInputChange(name, value)
  }   
  return (
    <TextField 
      inputProps={{ tabIndex: 0 }}
      id={id}
      label={name}
      multiline={multilineRows ? true : false}
      maxRows={multilineRows}
      fullWidth
      name={formControlName}
      value={inputValue || ''}
      onChange={(event) => setInputValue(event.target.value)}
      onBlur={handleFormChange}
      type={type}
    />
  )
}

export default FormInput;
