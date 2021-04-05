import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, List, Avatar, Button, FilledInput, Grid, Icon, IconButton, ListItem, TextField, Toolbar, Typography, Box } from '@material-ui/core'
import { Send, Reorder } from '@material-ui/icons';
import React from 'react'
import socket from '../socket'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/ducks/reducer'

// Icon
// Button
const useStyles = makeStyles((theme) => ({
  chat: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'whitesmoke',
    height: '750px',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  roomName: {
    marginLeft: '10px',
  },

  messagesContainer: {
    marginTop: '10px',
    // background: 'yellow',
    // flex: 1,
    height: '100%',
    overflowY: 'scroll',
  },
  sendMessage: {
    display: 'flex',
  },
  input: {
    width: '100%',
    marginRight: '5px',
  },


  myMessage: {
    // margin: 'right',
    // background: 'blue',
    // width: '75%',
    // color: '#33eaff',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '10px',
  },

  theirMessage: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '10px',
  },

  messageContent: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 10px',
  },
  messageBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 20px'
  },
  messageName: {
    fontSize: '14px',
    opacity: 0.8,
  },
  messageTime: {
    opacity: 0.6,
    fontSize: '12px',
    // fontSize: '12px',
    // textAlign: 'center'
  },
  messageText: {
    background: '#33eaff',
    padding: '15px',
  },

}));
// TextField
function Chat(props) {
  const { user } = props

  const classes = useStyles()
  const [text, setText] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  
  const room = useSelector(state => state.reducer.room)

  const messages = useSelector(state => state.reducer.messages)
  const dispatch = useDispatch()

  useEffect(() => {
    if (room) socket.emit('start chat', room)
  }, [room])

  useEffect(() => {
    socket.on('messages', messages => {
      dispatch(setMessages(messages))
      scroll()
    })

    socket.on('message', message => {
      // console.log('message')
      setNewMessage(message)
    })
  }, [socket])

  useEffect(() => {
    if (newMessage) {
      dispatch(setMessages([...messages, newMessage]))
      scroll()
    }
  }, [newMessage])

  function scroll() {
    let scrollDiv = document.getElementById('scroll')
    if (scrollDiv) {
      scrollDiv.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      })
    }

  }


  const handleSubmit = (e) => {
    e.preventDefault()
    let message = {
      by: user,
      text,
      room,
      roomName: room.name,
    }
    // console.log(message)
    socket.emit('message', message)
    setText('')
  }
  return (
    <Grid className={classes.chat} item xs={12} sm={8} md={6} lg={6}>
      {
        room &&
        <>
          <AppBar position="static">
            <Toolbar
              className={classes.title}
              variant="dense"
            >
              <Avatar src={room.picture} />
              <Typography
                className={classes.roomName}
                variant="h6" color="inherit">
                {room.target ? room.target.name : room.name}
              </Typography>
              <IconButton>
                <Reorder className={classes.more} fontSize='large' />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* messages */}
          <Box id='scroll' className={classes.messagesContainer}>
            {
              messages.map(message => {
                return (
                  <Box
                    key={message._id}
                    className={user.email !== message.by.email ? classes.theirMessage : classes.myMessage}
                  >
                    <Avatar
                      src={message.by.picture}
                      className={classes.messageAvatar} />
                    <Box className={classes.messageContent}>
                      <Box className={classes.messageBar}>
                        <Typography className={classes.messageName}>{message.by.name}</Typography>
                        <Typography className={classes.messageTime}>{new Date(message.createdAt).toDateString()}</Typography>
                      </Box>
                      <Typography className={classes.messageText}
                        style={{ background: user.email === message.by.email && 'lightgray' }}
                      >
                        {message.text}
                      </Typography>
                    </Box>
                  </Box>
                )
              })
            }

          </Box>

          <form
            className={classes.sendMessage}
            onSubmit={handleSubmit}>
            <TextField
              className={classes.input}
              id="outlined"
              label="Your message"
              // defaultValue="Default Value"
              variant="outlined"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button
              type='submit'
              variant="contained"
              color="primary"
              endIcon={<Send />}
              style={{ borderRadius: 0 }}
            >
              Send
            </Button>
          </form>
        </>
      }

    </Grid >
  )
}

export default Chat
