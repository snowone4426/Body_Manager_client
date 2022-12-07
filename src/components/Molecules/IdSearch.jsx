import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'

export default function IdSearch({ modalOpener = () => {} }) {
  const [userInfo, setUserInfo] = useState({ name: '', phone: '' })

  const onChangeHanlder = (e, key) => {
    setUserInfo({ ...userInfo, [key]: e.target.value })
  }

  const submitHanlder = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/findEmail`, userInfo)
      .then((res) => {
        if (res.data.message === 'ok') {
          alert(res.data.data.email)
          modalOpener()
          return
        }
        alert('가입되어있지 않은 정보 입니다.')
      })
      .catch((err) => console.log(err))
  }

  return (
    <IdSearchContainer>
      <ul>
        <li>
          <label>
            이름
            <input
              onChange={(e) => onChangeHanlder(e, 'name')}
              type="text"
              value={userInfo.name}
            />
          </label>
        </li>
        <li>
          <label>
            전화번호
            <input
              onChange={(e) => onChangeHanlder(e, 'phone')}
              type="text"
              value={userInfo.phone}
            />
          </label>
        </li>
      </ul>
      <button onClick={submitHanlder}>찾기</button>
    </IdSearchContainer>
  )
}

const IdSearchContainer = styled.div`
  background-color: white;
`
