import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'

export default function PasswordSearch({ modalOpener }) {
  const [userInfo, setUserInfo] = useState({
    email: '',
    code: '',
    password: '',
  })
  const [sendEmail, setSendEmail] = useState(false)
  const [enteredCode, setEnteredCode] = useState(false)

  const onChangeHanlder = (e, key) => {
    setUserInfo({ ...userInfo, [key]: e.target.value })
  }

  const mailSendHanlder = () => {
    // eslint-disable-next-line no-useless-escape
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
    if (!exptext.test(userInfo.email)) {
      alert('이메일 형식이 올바르지 않습니다.')
      return
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/mail`, {
        email: userInfo.email,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          alert('이메일을 확인해주세요')
          setSendEmail(true)
          return
        }
        alert('가입되어있지 않은 정보 입니다')
      })
      .catch((err) => {
        console.log(err)
        alert('다시 시도해 주세요')
      })
    // setSendEmail(true)
  }

  const codeHanlder = () => {
    if (!userInfo.code) {
      alert('code를 입력해 주세요')
      return
    }
    setEnteredCode(true)
  }

  const submitHanlder = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/mail/check`, userInfo)
      .then((res) => {
        if (res.data.message === 'ok') {
          modalOpener('')
          return
        }
        alert('올바르지 않은 코드입니다')
        setUserInfo({ ...userInfo, code: '', password: '' })
        setEnteredCode(false)
      })
      .catch((err) => {
        console.log(err)
        alert('다시 시도해 주세요')
      })
  }

  const pressEnterHanlder = (e, key) => {
    if (e.key === 'Enter') {
      switch (key) {
        case 'code':
          codeHanlder()
          return
        case 'mail':
          mailSendHanlder()
          return
        case 'submit':
          submitHanlder()
          return
        default:
          return
      }
    }
  }

  const preSendEamil = (
    <>
      <InputBox>
        <InputFrame>
          <CustomInput
            onChange={(e) => onChangeHanlder(e, 'email')}
            onKeyDown={(e) => pressEnterHanlder(e, 'mail')}
            type="text"
            value={userInfo.email}
            placeholder="Email"
          />
        </InputFrame>
      </InputBox>
      <SubmitBtn isFill={!!userInfo.email} onClick={mailSendHanlder}>
        확인 메일 발송
      </SubmitBtn>
    </>
  )

  const preEnterCode = (
    <>
      <InputBox>
        <InputFrame>
          <CustomInput
            onChange={(e) => onChangeHanlder(e, 'code')}
            onKeyDown={(e) => pressEnterHanlder(e, 'code')}
            type="text"
            value={userInfo.code}
            placeholder="code 입력"
          />
        </InputFrame>
      </InputBox>
      <SubmitBtn
        isFill={!!userInfo.code && !!userInfo.email}
        onClick={codeHanlder}
      >
        찾기
      </SubmitBtn>
    </>
  )

  const afterEnterCode = (
    <>
      <div>변경하실 비밀번호를 입력해 주세요</div>
      <InputBox>
        <InputFrame>
          <CustomInput
            onChange={(e) => onChangeHanlder(e, 'password')}
            onKeyDown={(e) => pressEnterHanlder(e, 'submit')}
            type="text"
            value={userInfo.password}
            placeholder="password"
          />
        </InputFrame>
      </InputBox>
      <SubmitBtn
        isFill={!!userInfo.code && !!userInfo.email}
        onClick={submitHanlder}
      >
        비밀번호 변경
      </SubmitBtn>
    </>
  )

  return (
    <PasswordSearchContainer>
      <CloseBtn onClick={() => modalOpener('')}></CloseBtn>
      <SearchTitle>비밀번호 찾기</SearchTitle>
      {sendEmail && enteredCode
        ? afterEnterCode
        : sendEmail
        ? preEnterCode
        : preSendEamil}
    </PasswordSearchContainer>
  )
}

const PasswordSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;
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

const SearchTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const CustomInput = styled.input`
  width: 18rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  margin: 0.2rem;
  padding: 1rem;
  background-color: #ebebeb;
`

const SubmitBtn = styled.button`
  width: 18rem;
  height: 2.5rem;
  font-weight: 600;
  border-radius: 0.4rem;
  margin-top: 1rem;
  background-color: #cecece;
  opacity: ${({ isFill }) => (isFill ? 1 : 0.5)};
`

const InputBox = styled.ul``
const InputFrame = styled.li``
