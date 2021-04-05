import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import Inbox from './Inbox';
import socket from '../socket';

import { useDispatch, useSelector } from 'react-redux'
import { setInboxList } from '../redux/ducks/inbox'
// ListItemAvatar
// Divider

const useStyles = makeStyles((theme) => ({
  messages: {
    background: 'white',
    height: '750px',
    marginBottom: '10px',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  avatar: {

  },
  userName: {
    marginLeft: '10px',
  },
  messagesContainer: {
    height: '670px',
    overflowY: 'scroll',
  },

}));

export default function InboxList(props) {
  const { user } = props
  const inboxList = useSelector(state => state.inboxReducer.inboxList)
  const newMessage = useSelector(state => state.messageReducer.newMessage)
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (newMessage)
      dispatch(setInboxList([newMessage, ...inboxList.filter(m => m.roomName !== newMessage.roomName)]))

  }, [newMessage])


  return (
    <Grid className={classes.messages} item xs sm={4} md={3}>
      <AppBar position="static">
        <Toolbar className={classes.title} variant="dense">
          <Typography variant="h6" color="inherit">
            Inboxs
          </Typography>
          <Toolbar>
            <Avatar className={classes.avatar} src={user.picture} />
            <Typography className={classes.userName} variant="h6" color="inherit">
              {user.name}
            </Typography>
          </Toolbar>

        </Toolbar>
      </AppBar>

      <List className={classes.messagesContainer}>
        {
          inboxList.map((message) => {
            return (
              <Inbox key={message._id} message={message} user={user} />
            )
          })
        }

      </List>
    </Grid>

  )
}


