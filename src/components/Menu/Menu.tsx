import { Toolbar, IconButton, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, useTheme, Container } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext, useState } from 'react';
import { AppBar, Drawer, DrawerHeader } from './Menu.styles';
import CastleIcon from '@mui/icons-material/Castle';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuPages } from '../../models/menu.constants';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../config/auth-context';

const Menu = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  const navigator = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const getMenuListItemButton = (text: string, getIconComponent: Function, route?: string, handleOnClick?: Function) => {
    const handleListItemButtonClick = () => {
      if(handleOnClick) {
        handleOnClick();
      }
      if(route) {
        navigator(route)
      }
    }
    return (
      <ListItemButton
        key={text}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={handleListItemButtonClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            alignItems: !open ? 'center' : 'unset',
            flexFlow: !open ? 'column' :  'nowrap'
          }}
        >
          {getIconComponent()}
          {!open ? <Container sx={{flexFlow: 'column', overflowWrap: 'break-word'}}>{text}</Container> : null}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ display: open ? 'initial' : 'none' }} />
      </ListItemButton>
    )
  }
  
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {getMenuListItemButton("Home", () => (<CastleIcon/>), MenuPages.HOME)}
          {getMenuListItemButton("Player", () => (<PermContactCalendarIcon/>), MenuPages.PLAYER)}
          {getMenuListItemButton("Market", () => (<StorefrontIcon/>), MenuPages.MARKET)}
          <Divider/>
          {
            !auth.user ?
            getMenuListItemButton("Log In", () => (<LoginIcon/>), MenuPages.LOGIN) :
            getMenuListItemButton("Log Out", () => (<LogoutIcon/>), undefined, auth.signout)
          }
        </List>
        <Divider />
      </Drawer>    
    </>
  )
};

export default Menu;
