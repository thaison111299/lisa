import io from 'socket.io-client'
// const ENDPOINT = "https://lisaserver.herokuapp.com/"
const END_POINT = "http://localhost:1000"


const socket = io.connect(END_POINT)

export default socket