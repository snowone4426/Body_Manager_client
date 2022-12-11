import styled from 'styled-components'

import { SubscribeInfo, PaymentInfo } from '..'

export default function AccountSkeleton() {
  return (
    <AccountSkeletonContainer>
      <SubscribeInfo />
      <PaymentInfo />
    </AccountSkeletonContainer>
  )
}

const AccountSkeletonContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 96vh;
  padding: 2rem;
`
