import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions } from '../../store/auth'
import { ModalContainer, IdSearch, PasswordSearch } from '..'
import axios from 'axios'

export default function LoginForm() {
  const publicUrl = process.env.PUBLIC_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAOKEY}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/kakaologin`

  const [isModalOpen, setIsModalOpen] = useState('')
  const [loginInputData, setLoginInputData] = useState({ id: '', password: '' })

  const loginHanlder = () => {
    // axios
    //   .post(`${process.env.REACT_APP_SERVER_URL}/initial/login`, loginInputData)
    //   .then((res) => {
    //     dispatch(authActions.login(res.data.data))
    //     navigate('/management', { replace: true })
    //   })
    dispatch(authActions.login(loginInputData))
    navigate('/management', { replace: true })
  }

  const onChangeHanlder = (e, key) => {
    setLoginInputData({ ...loginInputData, [key]: e.target.value })
  }

  const modalOpener = (name) => {
    if (name === undefined) {
      setIsModalOpen('')
      return
    }
    setIsModalOpen(name)
  }

  return (
    <LoginFormContainer>
      <LoginFormFrame>
        <LoginTitle>Body Manager</LoginTitle>
        <LoginInput
          onChange={(e) => onChangeHanlder(e, 'id')}
          value={loginInputData.id}
          placeholder="ID"
        />
        <LoginInput
          onChange={(e) => onChangeHanlder(e, 'password')}
          value={loginInputData.password}
          placeholder="PASSWORD"
        />
        <BtnBox>
          <LoginSearchBtn onClick={() => navigate('/signup')}>
            회원가입
          </LoginSearchBtn>
          <LoginSearchBtn onClick={() => modalOpener('id')}>
            아이디 찾기
          </LoginSearchBtn>
          <LoginSearchBtn onClick={() => modalOpener('password')}>
            비밀번호 찾기
          </LoginSearchBtn>
        </BtnBox>
        {isModalOpen && (
          <ModalContainer onClickFn={modalOpener}>
            {isModalOpen === 'id' ? (
              <IdSearch modalOpener={modalOpener} />
            ) : (
              <PasswordSearch modalOpener={modalOpener} />
            )}
          </ModalContainer>
        )}
        <LoginBtn onClick={loginHanlder}>Login</LoginBtn>

        <AuthLink href={kakaoLink}>
          <AuthButtonImg
            src={`${publicUrl}/assets/kakao_login_medium_narrow.png`}
            alt="카카오 소셜 로그인"
          />
        </AuthLink>
      </LoginFormFrame>
    </LoginFormContainer>
  )
}

const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100vh;
`

const LoginFormFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25rem;
  border-radius: 1rem;
  padding: 2rem;
  background-color: #edece0;
`

const LoginTitle = styled.div`
  font-size: 1.7rem;
`

const LoginInput = styled.input`
  width: 18rem;
  height: 2.5rem;
  border: 1px solid black;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  margin: 0.2rem;
  padding: 1rem;
`

const LoginBtn = styled.button`
  width: 18rem;
  height: 2.5rem;
  border: 1px solid black;
  border-radius: 0.4rem;
  background-color: white;
`

const BtnBox = styled.div``

const LoginSearchBtn = styled.button``

const AuthLink = styled.a``

const AuthButtonImg = styled.img``
