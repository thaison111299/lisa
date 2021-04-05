const SET_INBOX_LIST = 'inbox/setInboxList'


export const setInboxList = inboxList => ({
  type: SET_INBOX_LIST,
  value: inboxList
})

const initState = {
  inboxList: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_INBOX_LIST:
      return { ...state, inboxList: action.value }

    default:
      return state
  }
}