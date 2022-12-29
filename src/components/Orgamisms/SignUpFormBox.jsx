import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import { SignUpFormList } from '..'

export default function SignUpFormBox({
  inputFn = (e, key) => {},
  submitFn = () => {},
  validationCheck = {},
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
  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    Object.keys(data).forEach((el) => {
      if (!!data[el].length) {
        setCanSubmit(false)
        return
      }
      setCanSubmit(true)
    })
  }, [data])

  return (
    <SignUpFormContainer>
      <SignUpFormFrame>
        <SignUpTitle>회원가입</SignUpTitle>
        <SignUpFormList
          inputFn={inputFn}
          data={data}
          validationCheck={validationCheck}
        />
        <SubmitBtn
          canSubmit={canSubmit}
          disabled={!canSubmit}
          onClick={submitFn}
        >
          등록
        </SubmitBtn>
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
  cursor: ${({ canSubmit }) => (canSubmit ? 'pointer' : 'not-allowed')};
  opacity: ${({ canSubmit }) => (canSubmit ? 1 : 0.5)};
`
