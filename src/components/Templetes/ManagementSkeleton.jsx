import styled from 'styled-components'

import { CalanderAside, ManagementMain } from '..'

export default function ManagementSkeleton({ children }) {
  return (
    <ManagementSkeletonContainer>
      <ManagementMain>{children}</ManagementMain>
      <CalanderAside />
    </ManagementSkeletonContainer>
  )
}

const ManagementSkeletonContainer = styled.main`
  display: flex;
  width: calc(100vw - 9rem);
  min-height: calc(100vh - 5rem);
  overflow: hidden;
`
