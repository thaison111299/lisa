import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, Avatar } from '@material-ui/core'
import { Drafts } from '@material-ui/icons';
import { setRoom } from '../redux/ducks/reducer'
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';

const useStyles = makeStyles((theme) => ({
  friends: {
    // background: 'orange',
    height: '750px',
  },
  username: {
    marginLeft: '10px',
  },
}));


export default function Friend(props) {
  const { friend } = props
  const user = useSelector(state => state.reducer.user)
  // useSelector
  const dispatch = useDispatch()
  const classes = useStyles()


  const handleClick = () => {
    let room = {
      by: user,
      name: [user.nickname, friend.nickname].sort().join(' and '),
      picture: friend.picture
    }
    socket.emit('create room', room)
    dispatch(setRoom(room))
  }

  return (
    <ListItem button onClick={handleClick}>
      <Avatar src={friend.picture} />
      <Typography className={classes.username} >{friend.name}</Typography>
    </ListItem>
  )
}

