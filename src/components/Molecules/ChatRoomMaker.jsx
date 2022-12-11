import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

export default function ChatRoomMaker({ onClickFn }) {
  const [memberList, setMemberList] = useState([
    // {
    //   member_id: 1,
    //   receiver_name: '한태규',
    //   receiver_profile: 'S3주소',
    // },
    // {
    //   member_id: 2,
    //   receiver_name: '전찬석',
    //   receiver_profile: 'S3주소',
    // },
    // {
    //   member_id: 3,
    //   receiver_name: '자동차',
    //   receiver_profile: 'S3주소',
    // },
  ])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/message/memlist`, {
        withCredentials: true,
      })
      .then((res) => setMemberList[res.data.data])
      .catch((err) => console.log(err))
  }, [])

  const chatMakeHanlder = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/message/create`,
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
      <div>대상 : </div>
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

const ChatRoomMakerContainer = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  border-radius: 0.5rem 0rem 0.5rem 0.5rem;
  color: white;
  margin-right: 1.4rem;
  padding: 1rem;
  background-color: #3d3d3d;
`

const ChatMakeBtn = styled.button`
  color: white;
`
