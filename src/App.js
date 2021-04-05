import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Box, Container } from '@material-ui/core';
import Messages from './components/Messages';
import Chat from './components/Chat';
import Friends from './components/Friends';
import { useAuth0 } from '@auth0/auth0-react'

import { ArrowForward } from '@material-ui/icons';
import socket from './socket';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/ducks/reducer'


const useStyles = makeStyles((theme) => ({
  app: {

  },
  loginButton: {
    // alignSelf: 'center !important',
    // width: '200px',
    // height: '100px',
  },
}));

export default function App() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0()
  const classes = useStyles();
  const dispatch = useDispatch()


  useEffect(() => {
    if (user && isAuthenticated) {
      socket.emit('start app', user)
      // socket.emit('start', user)
      // socket.emit('login', user)
      dispatch(setUser(user))
    }
  }, [user, isAuthenticated])


  const handleLogin = () => {
    loginWithRedirect()
  }


  return (
    <Box className={classes.app}>
      {
        isAuthenticated && user ?
          <Grid container className={classes.app} spacing={2} >
            <Messages user={user} />
            <Chat user={user} />
            <Friends user={user} />
          </Grid >
          :
          <Button
            className={classes.loginButton}
            onClick={handleLogin}
            variant='contained'
            color='primary'
            endIcon={<ArrowForward />}
          > Login
          </Button>
      }
    </Box>
  );
}