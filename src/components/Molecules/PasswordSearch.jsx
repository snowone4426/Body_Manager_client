import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'

export default function PasswordSearch({ modalOpener }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    code: '',
    password: '',
  })

  const onChangeHanlder = (e, key) => {
    setUserInfo({ ...userInfo, [key]: e.target.value })
  }

  const mailSendHanlder = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/mail`, {
        email: userInfo.email,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          alert('이메일을 확인해주세요')
          modalOpener()
          return
        }
        alert('가입되어있지 않은 정보 입니다.')
      })
      .catch((err) => console.log(err))
  }

  const submitHanlder = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/initial/mail/check`,
        userInfo,
        { withCredentials: true },
      )
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
    <PasswordSearchContainer>
      <ul>
        <li>
          <label>
            email
            <input
              onChange={(e) => onChangeHanlder(e, 'name')}
              type="text"
              value={userInfo.email}
            />
          </label>
          <button onClick={mailSendHanlder}>이메일 확인</button>
        </li>
        <li>
          <label>
            code
            <input
              onChange={(e) => onChangeHanlder(e, 'code')}
              type="text"
              value={userInfo.code}
            />
          </label>
        </li>
        <li>
          <label>
            change password
            <input
              onChange={(e) => onChangeHanlder(e, 'password')}
              type="text"
              value={userInfo.password}
            />
          </label>
        </li>
      </ul>
      <button onClick={submitHanlder}>비밀번호 변경</button>
    </PasswordSearchContainer>
  )
}

const PasswordSearchContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
`
