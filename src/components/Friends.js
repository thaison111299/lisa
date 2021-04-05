import React, { useEffect, useState } from 'react'
import { TextField, AppBar, Button, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Modal, Toolbar, Typography, Avatar, Checkbox, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Send, Drafts, Inbox, Add, PeopleAltOutlined, ExitToApp, SettingsSystemDaydream } from '@material-ui/icons';
import Friend from './Friend'
import Room from './Room'
import { useAuth0 } from '@auth0/auth0-react';
import socket from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom, setFriends, setRooms } from '../redux/ducks/reducer'


const useStyles = makeStyles((theme) => ({

  bar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  friends: {
    // background: 'orange',
    height: '750px',
    position: 'relative',
  },

  create: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  createChatRoom: {
    background: 'white',
    // marginTop: '40%',  
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }
}));


export default function Friends(props) {
  const { logout } = useAuth0()
  const classes = useStyles()
  // const user = useSelector(state => state.reducer.user)
  const { user } = props
  const friends = useSelector(state => state.reducer.friends)
  const rooms = useSelector(state => state.reducer.rooms)
  const [newUser, setNewUser] = useState(null)
  const [nameList, setNameList] = useState([])
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('send users', users => {
      console.log('send users')
      console.log(users)
      // users = users.filter(guy => guy.email !== user.email) // unness
      dispatch(setFriends(users))
    })


    socket.on('rooms', rooms => {
      console.log('rooms:', rooms.length)
      dispatch(setRooms(rooms))
    })


  }, [socket])


  const handleLogout = () => {
    logout({
      returnTo: window.location.origin
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = (e) => {
    let nickname = e.target.value
    // alert(nickname)
    if (e.target.checked)
      setNameList([...nameList, nickname])
    else {
      let clone = [...nameList]
      clone = clone.filter(name => name !== e.target.value)
      setNameList(clone)
    }
  }


  const handleCreateGroupChat = () => {
    let clone = [...nameList, user.nickname]

    let room = {
      by: user,
      name: clone.sort().join(' and '),
      picture: null
    }

    socket.emit('create room', room)
    dispatch(setRoom(room))
    setNameList([])
  }

  return (
    <Grid className={classes.friends} item xs sm={12} md={3}>
      <AppBar position="static">
        <Toolbar
          className={classes.bar}
          variant="dense">
          <Typography variant="h6" color="inherit">
            Friends
          </Typography>
          <Button
            onClick={handleLogout}
            variant='contained'
            color='secondary'
            endIcon={<ExitToApp />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <List component="nav" aria-label="main mailbox folders">
        {
          friends.map((friend, i) => {
            return <Friend friend={friend} key={i} />
          })
        }
        <Typography> Rooms: </Typography>
        {
          rooms.map((room, i) => {
            return <Room room={room} key={i} />
          })
        }
      </List>
      <Fab
        onClick={handleOpen}

        variant='extended' className={classes.create} color="primary" aria-label="add">
        <Add />
        <Typography>
          group chat
        </Typography>
        <PeopleAltOutlined />
      </Fab>

      <Modal open={open} onClose={handleClose}>
        <Paper>
          <List>
            {
              friends.map(friend => {
                return (
                  <ListItem >
                    <Avatar src={friend.picture} />
                    <Typography>{friend.nickname}</Typography>
                    <Checkbox onChange={handleCheck} value={friend.nickname} />
                  </ListItem>
                )
              })


            }


          </List>
          <Button onClick={handleCreateGroupChat} variant='outlined'>create</Button>
        </Paper>



      </Modal>






    </Grid>
  )
}
