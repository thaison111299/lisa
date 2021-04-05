import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import { setRoom } from '../redux/ducks/reducer'
import { useDispatch } from 'react-redux';
function Message(props) {
  const { message, user } = props

  const dispatch = useDispatch()


  const handleClick = () => {
    let friend = message.room.members.find(mem => mem.email !== user.email)
    let room
    if (friend) {
      room = {
        by: user,
        picture: friend.picture,
        target: friend,
        name: [user.nickname, friend.nickname].sort().join(' and '),
        members: [user, friend],
      }
    } else {
      room = {
        by: user,
        picture: null,
        target: null,
        name: `room of ${user.nickname}`,
        member: [user],
      }
    }


    // console.log(room)
    dispatch(setRoom(room))



  }
  return (
    <>
      <ListItem
        onClick={handleClick}
        button
        alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={message.by.picture} alt="Travis Howard" />
        </ListItemAvatar>
        <ListItemText
          primary={message.by.name}
          secondary={message.text}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

export default Message
