import styled from 'styled-components'
import { useState } from 'react'

import { ChatRoomMaker } from '..'

export default function ChatList({ chatListData = [], onClickFn = () => {} }) {
  const [roomMakerOpen, setRoomMakerOpen] = useState(false)

  return (
    <ChatListContainer>
      <div>채팅 리스트</div>
      <button onClick={() => setRoomMakerOpen(!roomMakerOpen)}>생성버튼</button>
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

const ChatListContainer = styled.div``

const ChatListBox = styled.ul``

const ChatListCard = styled.li`
  display: flex;
  cursor: pointer;
`

const ReceiverProfile = styled.img``

const ReceiverName = styled.div``
