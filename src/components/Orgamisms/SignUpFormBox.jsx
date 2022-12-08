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
      <p>회원가입</p>
      <SignUpFormList
        inputFn={inputFn}
        data={data}
        isDubplicate={isDubplicate}
      />
      <button onClick={submitFn}>등록</button>
    </SignUpFormContainer>
  )
}

const SignUpFormContainer = styled.div``
