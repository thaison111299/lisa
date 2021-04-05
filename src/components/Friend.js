import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, Avatar } from '@material-ui/core'
import { Drafts } from '@material-ui/icons';
import { setRoom } from '../redux/ducks/reducer'
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';

const useStyles = makeStyles((theme) => ({
  friends: {
    height: '750px',
  },
  username: {
    marginLeft: '10px',
  },
}));


export default function Friend(props) {
  const { friend } = props
  const user = useSelector(state => state.reducer.user)
  const dispatch = useDispatch()
  const classes = useStyles()


  const handleClick = () => {
    let room = {
      by: user,
      name: [user.nickname, friend.nickname].sort().join(' and '),
      memberNames: [user.name, friend.name],
      memberPictures : [user.picture, friend.picture]
    }

    dispatch(setRoom(room)) // here 
  }

  return (
    <ListItem button onClick={handleClick}>
      <Avatar src={friend.picture} />
      <Typography className={classes.username} >{friend.name}</Typography>
    </ListItem>
  )
}

