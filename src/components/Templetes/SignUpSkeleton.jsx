import styled from 'styled-components'

import { SignUpFormBox } from '..'

export default function SignUpSkeleton({
  memberInfo = {},
  inputFn = (e, key) => {},
  submitFn = () => {},
  isDubplicate = {},
}) {
  return (
    <SignUpSkeletonContainer>
      <SignUpFormBox
        data={memberInfo}
        isDubplicate={isDubplicate}
        inputFn={inputFn}
        submitFn={submitFn}
      />
    </SignUpSkeletonContainer>
  )
}

const SignUpSkeletonContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`
