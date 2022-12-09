import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Client } from '@stomp/stompjs'
import { useDispatch, useSelector } from 'react-redux'
import SockJS from 'sockjs-client'

import { ChatList, ChatRoom } from '..'
import { chatActions } from '../../store/chat'


export default function ChatModal() {
  const dispatch = useDispatch()
  const client = useSelector((state) => state.chat.client)
  const [chatState, setChatState] = useState(true)
  const [chatList, setChatList] = useState([
    {
      room_id: 1,
      receiver_name: '1',
      receiver_profile: 'S3주소',
    },
    {
      room_id: 2,
      receiver_name: '2',
      receiver_profile: 'S3주소',
    },
    {
      room_id: 3,
      receiver_name: '3',
      receiver_profile: 'S3주소',
    },
  ])
  const [roomInfo, setRoomInfo] = useState({ room_id: '', message_list: [] })

  const roomSetHanlder = (room_id) => {
    setRoomInfo({ ...roomInfo, room_id: room_id })
    roomMoveHanlder()
  }

  const roomMoveHanlder = () => {
    setChatState(!chatState)
  }

  const connect = () => {
<<<<<<< HEAD
    const connection = new Client({
      // brokerURL: 'ws://localhost:8081/chat/inbox',
      // connectHeaders: {
      //   login: 'user',
      //   passcode: 'password',
      // },
=======
    const connection = new StompJs.Client({
>>>>>>> 87eb155a24143a9cb0b952dbae8c7d5ac02033f7
      debug: function (str) {
        console.log(str)
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
    console.log(connection)

    connection.webSocketFactory = () => new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/inbox`)

    connection.webSocketFactory = () => {
      return new SockJS(`${process.env.REACT_APP_SERVER_URL}/chat/inbox`)
    }

    connection.onConnect = () => {
      console.log('socket connect!')
    }

    connection.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message'])
      console.log('Additional details: ' + frame.body)
    }

    connection.activate()

    dispatch(chatActions.connect({ connection }))
  }

  const disConnect = () => {
    if (client != null) {
      if (client.connected) {
        client.deactivate()
      }
      dispatch(chatActions.connect({ connection: null }))
    }
  }

  useEffect(() => {
<<<<<<< HEAD
    // axios
    //   .get(`${process.env.REACT_APP_SERVER_URL}/chatlist`)
    //   .then((res) => {
    //     setChatList(res.data.data)
    //   })
    //   .catch((err) => console.log(err))
=======
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/message/roomlist`, {
        withCredentials: true,
      })
      .then((res) => {
        setChatList(res.data.data)
      })
      .catch((err) => console.log(err))
>>>>>>> 87eb155a24143a9cb0b952dbae8c7d5ac02033f7

    connect()
    return () => disConnect()
  }, [])

  const chatLocation = chatState ? (
    <ChatList chatListData={chatList} onClickFn={roomSetHanlder} />
  ) : (
    <ChatRoom
      roomInfo={roomInfo}
      setRoomInfo={setRoomInfo}
      roomMoveHanlder={roomMoveHanlder}
    />
  )

  return <ChatModalContainer>{chatLocation}</ChatModalContainer>
}

const ChatModalContainer = styled.div`
  border-radius: 1rem;
  margin: 1rem;
  background-color: white;
`
