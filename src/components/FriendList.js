import React, { useEffect, useState } from 'react'
import { TextField, AppBar, Button, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Modal, Toolbar, Typography, Avatar, Checkbox, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Send, Drafts, Inbox, Add, PeopleAltOutlined, ExitToApp, SettingsSystemDaydream } from '@material-ui/icons';
import Friend from './Friend'
import Room from './Room'
import { useAuth0 } from '@auth0/auth0-react';
import socket from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom, setRooms } from '../redux/ducks/reducer'
import friend, { setFriendList, setNewFriend } from '../redux/ducks/friend'


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


export default function FriendList(props) {
  const { logout } = useAuth0()
  const classes = useStyles()
  // const user = useSelector(state => state.reducer.user)
  const { user } = props
  const friendList = useSelector(state => state.friendReducer.friendList)
  const newFriend = useSelector(state => state.friendReducer.newFriend)
  const rooms = useSelector(state => state.reducer.rooms)
  const [nameList, setNameList] = useState([])
  const [pictureList, setPictureList] = useState([])
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('user list', userList => dispatch(setFriendList(userList)))
    socket.on('new user', user => { // G
      dispatch(setNewFriend(user))
    })

    socket.on('room list', rooms => {
      rooms = rooms.filter(r => {
        return r.memberNames.length > 2 && r.name.includes(user.nickname)
      })

      dispatch(setRooms(rooms))
    })

  }, [socket])

  // Append new friend to friend list
  useEffect(() => {
    if (newFriend) dispatch(setFriendList([...friendList, newFriend]))
  }, [newFriend])


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
    let { value } = e.target
    let [nickname, picture] = value.split('@@@')
    // alert(nickname)
    if (e.target.checked) {
      setNameList([...nameList, nickname])
      setPictureList([...pictureList, picture])
    }

    else {
      let cloneName = [...nameList]
      let clonePicture = [...pictureList]

      cloneName = cloneName.filter(n => n !== nickname)
      clonePicture = clonePicture.filter(p => p !== picture)
      setNameList(cloneName)
      setPictureList(clonePicture)
    }
  }


  const handleCreateGroupChat = () => {
    if (nameList.length <= 0)
      return

    let cloneName = [...nameList, user.nickname]
    let clonePicture = [...pictureList, user.picture]

    let room = {
      by: user,
      memberNames: cloneName,
      memberPictures: clonePicture,
      name: cloneName.sort().join(' and ')
    }

    dispatch(setRoom(room))
    setNameList([])
    setPictureList([])

    // let room = {
    //   by: user,
    //   name: [user.nickname, friend.nickname].sort().join(' and '),
    //   memberNames: [user.name, friend.name],
    //   memberPictures: [user.picture, friend.picture]
    // }

    // dispatch(setRoom(room)) // here 


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
          friendList.map((friend, i) => {
            return <Friend friend={friend} key={i} />
          })
        }
        <hr />
        <Typography> Groupchat: </Typography>
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
        <Typography>Groupchat</Typography>
        <PeopleAltOutlined />
      </Fab>

      <Modal open={open} onClose={handleClose}>
        <Paper>
          <List>
            {
              friendList.map(friend => {
                return (
                  <ListItem >
                    <Avatar src={friend.picture} />
                    <Typography>{friend.nickname}</Typography>
                    <Checkbox onChange={handleCheck} value={friend.nickname + "@@@" + friend.picture} />
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
