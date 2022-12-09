import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { chatActions } from '../../store/chat'

export default function ChatRoom({
  roomInfo,
  setRoomInfo = () => {},
  roomMoveHanlder = () => {},
}) {
  const dispatch = useDispatch()
  const client = useSelector((state) => state.chat.client)
  const [content, setContent] = useState('')

  const subscribe = (room_id) => {
    if (client != null) {
      if (!client.connected) {
        roomMoveHanlder()
        return
      }

<<<<<<< HEAD
      client.subscribe(`/sub/chat/send/1`, (data) => {
=======
      client.subscribe(`/sub/chat/send/${room_id}`, (data) => {
>>>>>>> 87eb155a24143a9cb0b952dbae8c7d5ac02033f7
        const newMessage = JSON.parse(data.body).message_list
        addContent(newMessage)
      })
    }
  }

  const addContent = (message) => {
    setRoomInfo({ ...roomInfo, message_list: [message, ...roomInfo] })
  }

  const messagePublishHanlder = () => {
    if (client != null) {
      if (!client.connected) return

      client.publish({
        destination: `/pub/chat/mes/${roomInfo.room_id}`,
        body: JSON.stringify({ content: content }),
      })
    }
  }

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/message/content`, {
        room_id: roomInfo.room_id,
        offset: 1,
        limit: 1,
      })
      .then((res) => {
        // setRoomInfo({ ...roomInfo, message_list: [...res.data.data] })
        // dispatch(chatActions.connect())
        console.log(res.data)
      })

    subscribe(roomInfo.room_id)
  }, [])

  return (
    <ChatRoomContainer>
      <button onClick={roomMoveHanlder}>close</button>
      <div>ChatRoom</div>
      <ul>
        {roomInfo.message_list.map((el) => (
          <li key={el.created_at}>
            <img src={el.profile} alt="profile" />
            <div>{el.member_name}</div>
            <div>{el.contents}</div>
          </li>
        ))}
      </ul>
      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        type="text"
      />
      <button onClick={messagePublishHanlder}>전송</button>
    </ChatRoomContainer>
  )
}

const ChatRoomContainer = styled.div``
