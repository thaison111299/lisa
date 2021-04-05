const SET_USER = 'reducer/setUser'
const SET_MESSAGES = 'reducer/setMessages'
const SET_NEW_MESSAGE = 'reducer/setNewMessage'
const SET_TARGET = 'reducer/setTarget'
const SET_ROOM = 'reducer/setRoom'
const SET_INBOXS = 'reducer/setInboxs'
const SET_ROOMS = 'reducer/setRooms'

// 1
export const setUser = user => ({
  type: SET_USER,
  value: user
})


// 4
export const setRoom = room => ({
  // Room is an object
  type: SET_ROOM,
  value: room
})

// 5
export const setTarget = target => ({
  type: SET_TARGET,
  value: target
})

// 6
export const setNewMessage = newMessage => ({
  type: SET_NEW_MESSAGE,
  value: newMessage
})

// 7
export const setMessages = messages => ({
  type: SET_MESSAGES,
  value: messages
})

// 8
export const setInboxs = inboxs => ({
  type: SET_INBOXS,
  value: inboxs
})

// 4
export const setRooms = rooms => ({
  // Room is an object
  type: SET_ROOMS,
  value: rooms
})

const initState = {
  user: null,
  friendList: [],
  newFriend: null,
  room: null,
  target: null,
  newMessages: null,
  messages: [],
  inboxs: [],
  rooms: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.value }
    case SET_ROOM:
      return { ...state, room: action.value }
    case SET_TARGET:
      return { ...state, target: action.value }
    case SET_NEW_MESSAGE:
      return { ...state, newMessage: action.value }
    case SET_MESSAGES:
      return { ...state, messages: action.value }
    case SET_INBOXS:
      return { ...state, inboxs: action.value }
    case SET_ROOMS:
      return { ...state, rooms: action.value }
    default:
      return state
  }
}