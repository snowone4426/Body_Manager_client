import styled from 'styled-components'

import { SignUpFormList } from '..'

export default function SignUpFormBox({
  inputFn = (e, key) => {},
  submitFn = () => {},
  isDubplicate = {},
  data = {
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    gender: '',
    height: '',
    remark: '',
    birth: '',
    profile: '',
  },
}) {
  return (
    <SignUpFormContainer>
      <SignUpFormFrame>
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpFormList
          inputFn={inputFn}
          data={data}
          isDubplicate={isDubplicate}
        />
        <SubmitBtn onClick={submitFn}>등록</SubmitBtn>
      </SignUpFormFrame>
    </SignUpFormContainer>
  )
}

const SignUpFormContainer = styled.section`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  background-color: white;
  margin: 10rem;
  padding: 1.5rem 2rem;
`
const SignUpFormFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SignUpTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
`

const SubmitBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 14rem;
  height: 1.8rem;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  color: white;
  margin-top: 1rem;
  background-color: #7b7b7b;
`
