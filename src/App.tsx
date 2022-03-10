import './App.css';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import { Box, ThemeProvider } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { DrawerHeader } from './components/Menu/Menu.styles';
import FirebaseService from './services/FirebaseService';
import { AuthContext } from './config/auth-context';
import Home from './components/Home/Home';
import PlayerSheet from './components/PlayerSheet/PlayerSheet';
import Market from './components/Market/Market';
import AuthProvider from './config/auth-context-provider';
import { MenuPages } from './models/menu.constants';
import Login from './components/Login/Login';
import theme from './theme';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path={MenuPages.PLAYER} element={
            <RequireAuth>
              <PlayerSheet/>
            </RequireAuth>
          }/>
          <Route path={MenuPages.MARKET} element={<Market/>}/>
          <Route path={MenuPages.LOGIN} element={<Login/>}/>
          <Route path="*" element={<Home/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={MenuPages.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Menu/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App;
