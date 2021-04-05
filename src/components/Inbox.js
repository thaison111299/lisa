import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import { setRoom } from '../redux/ducks/reducer'
import { useDispatch } from 'react-redux';
import socket from '../socket';
import { useState, useEffect } from 'react';
import { AvatarGroup } from '@material-ui/lab';
export default function Inbox(props) {
  const { message, user } = props
  const dispatch = useDispatch()


  useEffect(() => {
    socket.on('room', room => dispatch(setRoom(room)))
  }, [socket])


  const handleClick = () => {
    socket.emit('get room', message.roomName)
  }

  return (
    <>
      <ListItem
        onClick={handleClick}
        button
        alignItems="flex-start">
        <AvatarGroup>
          <Avatar src={message.by.picture} alt="Travis Howard" />
        </AvatarGroup>
        <ListItemText
          primary={message.by.name}
          secondary={message.text}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
