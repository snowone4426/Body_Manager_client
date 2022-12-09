import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

export default function ChatRoomMaker({ onClickFn }) {
  const [memberList, setMemberList] = useState([
    {
      member_id: 1,
      receiver_name: '1',
      receiver_profile: 'S3주소',
    },
    {
      member_id: 2,
      receiver_name: '2',
      receiver_profile: 'S3주소',
    },
    {
      member_id: 3,
      receiver_name: '3',
      receiver_profile: 'S3주소',
    },
  ])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_APP}/message/memlist`, {
        withCredentials: true,
      })
      .then((res) => setMemberList[res.data.data])
      .catch((err) => console.log(err))
  }, [])

  const chatMakeHanlder = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_APP}/message/create`,
        {
          receiver_id: 1,
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          onClickFn(res.data.data.room_id)
        }
      })
  }
  return (
    <ChatRoomMakerContainer>
      <div>대상 선택</div>
      <select>
        {memberList.map((el) => (
          <option key={el.member_id} value={el.member_id}>
            {el.receiver_name}
          </option>
        ))}
      </select>
      <ChatMakeBtn onClick={chatMakeHanlder}>방만들기</ChatMakeBtn>
    </ChatRoomMakerContainer>
  )
}

const ChatRoomMakerContainer = styled.div``

const ChatMakeBtn = styled.button``
