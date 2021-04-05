import React, { useEffect } from 'react';
import { Grid, Button, Box } from '@material-ui/core';
import InboxList from './components/InboxList';
import Chat from './components/Chat';
import FriendList from './components/FriendList';
import { useAuth0 } from '@auth0/auth0-react'
import { ArrowForward, Message } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/ducks/reducer'

import socket from './socket';

export default function App() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0()
  const dispatch = useDispatch()


  useEffect(() => {
    if (user && isAuthenticated) {
      socket.emit('user', user)
      dispatch(setUser(user))
    }
  }, [user, isAuthenticated])


  const handleLogin = () => {
    loginWithRedirect()
  }

  return (
    <Box >
      {
        isAuthenticated && user ?
          <Grid container spacing={2} >
            <InboxList user={user} />
            <Chat user={user} />
            <FriendList user={user} />
            <audio className="audio-element">
              <source src="./sound.mp3"></source>
            </audio>
          </Grid >
          :
          <Button
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