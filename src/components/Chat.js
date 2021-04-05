import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Avatar, Button, Grid, IconButton,
  TextField, Toolbar, Typography, Box
} from '@material-ui/core'
import { Close, Send, Reorder } from '@material-ui/icons';
import React from 'react'
import socket from '../socket'
import { useDispatch, useSelector } from 'react-redux';
import message, { setMessageList, setNewMessage } from '../redux/ducks/message'
import { setRoom } from '../redux/ducks/reducer';
import { AvatarGroup } from '@material-ui/lab';

// Icon
// Button
const useStyles = makeStyles((theme) => ({
  closeButton: {
    color: 'white',
  },
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

}))
// TextField
function Chat(props) {
  const { user } = props
  const room = useSelector(state => state.reducer.room)
  const messageList = useSelector(state => state.messageReducer.messageList)
  const newMessage = useSelector(state => state.messageReducer.newMessage)

  const dispatch = useDispatch()
  const classes = useStyles()
  const [text, setText] = useState('')

  const [roomName, setRoomName] = useState('') // If 1 vs 1 name of clicked friend

  useEffect(() => {
    // by: user,
    // name: [user.nickname, friend.nickname].sort().join(' and '),
    // memberNames: [user.name, friend.name],
    // memberPictures : [user.picture, friend.picture]
    if (room) {
      socket.emit('room', { room, nickname: user.nickname }) // Join user to this room???
      if (room.memberNames.length < 3)
        setRoomName(room.memberNames.find(name => name !== user.name))
      else
        setRoomName(room.name)
    }
  }, [room])

  useEffect(() => {
    socket.on('message list', messageList => dispatch(setMessageList(messageList)))
    socket.on('message', message => {
      const audioEl = document.getElementsByClassName("audio-element")[0]
      audioEl.play()
      dispatch(setNewMessage(message))
    })
  }, [socket])

  useEffect(() => {
    if (newMessage && room && newMessage.roomName === room.name) {
      dispatch(setMessageList([...messageList, newMessage]))
      scroll()
    }
  }, [newMessage])

  // handleSendMessage
  const handleSendMessage = e => {
    e.preventDefault()
    let message = {
      by: user,
      text,
      roomName: room.name,
    }
    // console.log(message)
    socket.emit('message', message)
    setText('')
  }



  const handleCloseChat = () => dispatch(setRoom(null))



  function scroll() {
    let scrollDiv = document.getElementById('scroll')
    if (scrollDiv) {
      scrollDiv.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      })
    }
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
              <AvatarGroup>
                {room.memberPictures.map(pic => <Avatar src={pic} />)}
              </AvatarGroup>

              <Typography
                className={classes.roomName}
                variant="h6" color="inherit">
                {roomName}
              </Typography>
              <IconButton>
                <Reorder className={classes.closeButton} fontSize='large' />
              </IconButton>
              <IconButton onClick={handleCloseChat}>
                <Close className={classes.closeButton} fontSize='large' />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/* messages */}
          <Box id='scroll' className={classes.messagesContainer}>
            {
              messageList.map(message => {
                return (
                  <Box
                    key={message._id}
                    className={user.nickname !== message.by.nickname ? classes.theirMessage : classes.myMessage}
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
            onSubmit={handleSendMessage}>
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
