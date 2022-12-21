import styled from 'styled-components'

import { SignUpFormBox } from '..'

export default function SignUpSkeleton({
  memberInfo = {},
  inputFn = (e, key) => {},
  submitFn = () => {},
  isDubplicate = {},
}) {
  return (
    <SignUpSkeletonContainer
      url={`${process.env.PUBLIC_URL}/assets/running.jpg`}
    >
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
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0.25)
    ),
    ${({ url }) => `url(${url})`};
  background-size: cover;
  overflow: hidden;
`
