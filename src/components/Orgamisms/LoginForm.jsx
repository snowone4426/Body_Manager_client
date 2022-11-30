import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { authActions } from '../../store/authentication/auth'
export default function LoginForm() {
  const publicUrl = process.env.PUBLIC_URL
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const loginHanlder = () => {
    dispatch(authActions.login())
    navigation('/management', { replace: true })
  }

  return (
    <LoginFormContainer>
      <LoginFormFrame>
        <LoginTitle>LOGIN</LoginTitle>
        <LoginInput />
        <LoginInput />
        <LoginSearchBtn>아이디 찾기</LoginSearchBtn>
        <LoginSearchBtn>비밀번호 찾기</LoginSearchBtn>
        <LoginBtn onClick={loginHanlder}>Login</LoginBtn>

        <AuthButton
          src={`${publicUrl}/assets/btn_google_signin_dark_normal_web.png`}
          alt="구글 소셜 로그인"
        />
        <AuthButton
          src={`${publicUrl}/assets/kakao_login_medium_narrow.png`}
          alt="카카오 소셜 로그인"
        />
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
  width: 20rem;
  height: 20rem;
  background-color: #f2f0d9;
`

const LoginTitle = styled.div``

const LoginInput = styled.input`
  border: 1px solid black;
  margin: 1px;
`

const LoginBtn = styled.button``

const LoginSearchBtn = styled.button``

const AuthButton = styled.img``
