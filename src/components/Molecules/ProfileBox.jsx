import styled from 'styled-components'

import { Profile } from '..'

export default function ProfileBox({
  userInfo = { profile: '', name: '', type: '' },
}) {
  return (
    <ProfileContainer>
      <Profile srcUrl={userInfo.profile} />
    </ProfileContainer>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`
