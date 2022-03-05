import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../config/auth-context';
import { MenuPages } from '../../models/menu.constants';
import FirebaseService from '../../services/FirebaseService';

type Props = {}

const Login = (props: Props) => {
  const auth = useContext(AuthContext)
  const navigator = useNavigate();
  useEffect(() => {
    //  redirect to home if logged in already
    if(auth.user) {
      navigator(`${MenuPages.HOME}`);
    }
  }, [auth])
  
	const onGoogleButtonPress = async () => {
    auth.signin();
	}	
	return (
    <Button variant="contained" onClick={onGoogleButtonPress}>Sign in with Google</Button>
	)
}

export default Login