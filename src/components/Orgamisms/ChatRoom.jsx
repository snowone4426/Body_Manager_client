import axios from 'axios'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export default function ChatRoom({
  roomInfo,
  setRoomInfo = () => {},
  roomMoveHanlder = () => {},
}) {
  const client = useSelector((state) => state.chat.client)
  const myName = useSelector((state) => state.auth.name)
  const [content, setContent] = useState('')

  const subscribe = (room_id) => {
    if (client != null) {
      if (!client.connected) {
        roomMoveHanlder()
        return
      }

      client.subscribe(`/sub/chat/send/${room_id}`, (data) => {
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
        setRoomInfo({ ...roomInfo, message_list: [...res.data.data] })
      })
    // setRoomInfo({
    //   ...roomInfo,
    //   message_list: [
    //     {
    //       member_name: 'ㅎㄹㅇ',
    //       profile: '',
    //       contents: 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇ',
    //       created_at: moment(new Date()).format('YYYY-MM-DD'),
    //     },
    //     {
    //       member_name: 'ㅁㄴㅇ',
    //       profile: '',
    //       contents: 'ㅁㄴㅇㄴㅁㅇㅁㄴㅇ',
    //       created_at: moment(new Date('2022-12-12')).format('YYYY-MM-DD'),
    //     },
    //   ],
    // })

    subscribe(roomInfo.room_id)
  }, [])

  return (
    <ChatRoomContainer>
      <CloseBtn onClick={roomMoveHanlder}></CloseBtn>
      <ChatTitle>ChatRoom</ChatTitle>
      <ChatFrame>
        <ChatCardBox>
          {roomInfo.message_list.map((el) => (
            <ChatCard
              key={el.created_at}
              isMe={myName === el.member_namemember_name}
            >
              <ChatProfile src={el.profile} alt="profile" />
              <ChatUserInfoBox>
                <ChatUserName>
                  {el.member_name}
                  <ChatTime>{el.created_at}</ChatTime>
                </ChatUserName>
                <ChatContext>{el.contents}</ChatContext>
              </ChatUserInfoBox>
            </ChatCard>
          ))}
        </ChatCardBox>
        <ChatInputBox>
          <ChatInputLabel>
            <ChatInput
              onChange={(e) => setContent(e.target.value)}
              value={content}
              type="text"
            />
          </ChatInputLabel>
          <ChatSendBtn onClick={messagePublishHanlder}>전송</ChatSendBtn>
        </ChatInputBox>
      </ChatFrame>
    </ChatRoomContainer>
  )
}

const ChatRoomContainer = styled.div`
  width: 20rem;
  height: 30rem;
  padding: 1rem;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.7rem;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  background-color: #ff5f57;
`

const ChatCardBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ChatTitle = styled.div``

const ChatCard = styled.li`
  display: flex;
  align-items: center;
  align-self: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  margin: 0.6rem 0;
`

const ChatProfile = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: black;
  overflow: hidden;
`

const ChatUserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`

const ChatUserName = styled.div`
  font-size: 1rem;
  color: #5c5c5c;
`

const ChatTime = styled.span`
  font-size: 0.8rem;
  color: #908f8f;
`

const ChatContext = styled.div`
  font-weight: 600;
`

const ChatInputBox = styled.div`
  display: flex;
  margin-top: 1rem;
`

const ChatFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`

const ChatInputLabel = styled.label`
  display: flex;
  align-items: center;
  width: 15rem;
  height: 2rem;
  padding: 0.3rem;
  cursor: text;
  background-color: #c1c1c1;
`

const ChatInput = styled.input`
  width: 100%;
  background-color: transparent;
`

const ChatSendBtn = styled.button`
  border-radius: 0.4rem;
  white-space: nowrap;
  margin-left: 1rem;
  padding: 0.5rem;
  background-color: #c1c1c1;
`
