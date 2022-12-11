import styled from 'styled-components'

import { LoginForm } from '..'

export default function LoginSkeleton() {
  return (
    <LoginSkeletonContainer
      url={`${process.env.PUBLIC_URL}/assets/running.jpg`}
    >
      <LoginForm />
    </LoginSkeletonContainer>
  )
}

const LoginSkeletonContainer = styled.main`
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
