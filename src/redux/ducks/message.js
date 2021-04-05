
const SET_MESSAGE_LIST = 'message/setMessageList'
const SET_NEW_MESSAGE = 'message/setNewMessage'

export const setNewMessage = newMessage => ({
  type: SET_NEW_MESSAGE,
  value: newMessage
})

export const setMessageList = messageList => ({
  type: SET_MESSAGE_LIST,
  value: messageList
})

const initState = {
  newMessage: null,
  messageList: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_MESSAGE_LIST:
      return { ...state, messageList: action.value }
    case SET_NEW_MESSAGE:
      return { ...state, newMessage: action.value }
    default:
      return state
  }
}