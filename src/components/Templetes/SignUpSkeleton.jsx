import styled from 'styled-components'

import { SignUpFormBox } from '..'

export default function SignUpSkeleton({
  memberInfo = {},
  inputFn = (e, key) => {},
  submitFn = () => {},
  duplicateCheckHanlder = () => {},
}) {
  return (
    <SignUpSkeletonContainer>
      <SignUpFormBox
        data={memberInfo}
        inputFn={inputFn}
        submitFn={submitFn}
        duplicateCheckHanlder={duplicateCheckHanlder}
      />
    </SignUpSkeletonContainer>
  )
}

const SignUpSkeletonContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
