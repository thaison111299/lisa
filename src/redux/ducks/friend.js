const SET_FRIEND_LIST = 'friend/setFriendList'
const SET_NEW_FRIEND = 'friend/setNewFriend'

export const setFriendList = friendList => ({
  type: SET_FRIEND_LIST,
  value: friendList
})


export const setNewFriend = newFriend => ({
  type: SET_NEW_FRIEND,
  value: newFriend
})


const initState = {
  friendList: [],
  newFriend: null,
}


export default (state = initState, action) => {
  switch (action.type) {
    case SET_FRIEND_LIST:
      return { ...state, friendList: action.value }
    case SET_NEW_FRIEND:
      return { ...state, newFriend: action.value }
    default:
      return state
  }
}