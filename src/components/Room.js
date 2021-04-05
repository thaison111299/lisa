import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ListItem, Avatar } from '@material-ui/core'
import { Drafts } from '@material-ui/icons';
import { setRoom } from '../redux/ducks/reducer'
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
import { AvatarGroup } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  room: {
    // background: 'orange',
    height: '750px',
  },
  username: {
    marginLeft: '10px',
  },
  avatar: {
    border: '2px solid black'
  }
}));


export default function Room(props) {
  const { room } = props
  const user = useSelector(state => state.reducer.user)
  // useSelector
  const dispatch = useDispatch()
  const classes = useStyles()


  const handleClick = () => {
    dispatch(setRoom(room))
  }

  return (
    <ListItem button onClick={handleClick}>
      <AvatarGroup>
        {
          room.memberPictures.map(pic => <Avatar className={classes.avatar} src={pic} />)
        }

      </AvatarGroup>

      <Typography className={classes.username} >{room.name}</Typography>
    </ListItem>
  )
}

