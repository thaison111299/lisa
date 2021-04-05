import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import Message from './Message';
import socket from '../socket';

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

function Messages(props) {
  const { user } = props
  const classes = useStyles()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // socket.emit('get inboxs', user)
  }, [])

  useEffect(() => {
    socket.on('inboxs', messages => {
      setMessages(messages)
    })
  }, [socket])

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
          messages.map((message) => {
            return (
              <Message key={message._id} message={message} user={user} />
            )
          })
        }

      </List>
    </Grid>

  )
}

export default Messages
