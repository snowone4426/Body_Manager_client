import styled from 'styled-components'
import { useState } from 'react'

import { ChatRoomMaker } from '..'

export default function ChatList({
  chatListData = [],
  onClickFn = () => {},
  modalClose = () => {},
}) {
  const [roomMakerOpen, setRoomMakerOpen] = useState(false)

  return (
    <ChatListContainer>
      <CloseBtn onClick={modalClose}></CloseBtn>
      <ChatTitle>CHAT LIST</ChatTitle>
      <ChatMakeBtn
        roomMakerOpen={roomMakerOpen}
        onClick={() => setRoomMakerOpen(!roomMakerOpen)}
      >
        생성버튼
      </ChatMakeBtn>
      {roomMakerOpen && <ChatRoomMaker onClickFn={onClickFn} />}
      <ChatListBox>
        {chatListData &&
          chatListData.map((el) => (
            <ChatListCard
              key={el.room_id}
              onClick={() => onClickFn(el.room_id)}
            >
              <ReceiverProfile
                src={el.receiver_profile}
                alt="receiver profile"
              />
              <ReceiverName>{el.receiver_name}</ReceiverName>
            </ChatListCard>
          ))}
      </ChatListBox>
    </ChatListContainer>
  )
}

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
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

const ChatTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`

const ChatMakeBtn = styled.button`
  align-self: flex-end;
  color: white;
  border-radius: ${({ roomMakerOpen }) =>
    roomMakerOpen ? '0.3rem 0.3rem 0 0' : '0.3rem'};
  padding: 0.3rem;
  margin-right: 1.4rem;
  background-color: #3d3d3d;
`

const ChatListBox = styled.ul``

const ChatListCard = styled.li`
  display: flex;
  align-items: center;
  width: 17rem;
  border-radius: 0.7rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #e7e7e7;
  cursor: pointer;
`

const ReceiverProfile = styled.img`
  width: 3rem;
  border: 1px solid #f5f5f5;
  border-radius: 50%;
  overflow: hidden;
`

const ReceiverName = styled.div`
  font-size: 1.3rem;
  margin-left: 1rem;
`
