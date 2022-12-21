import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { SubscribeInfoCard } from '..'

export default function SubscribeInfo() {
  const [subData, setSubData] = useState({ end_date: '', pt_remain_count: '' })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/account/member`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          setSubData(res.data.data)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  // const subData = {
  //   end_date: '2022-11-24',
  //   pt_remain_count: 11,
  // }
  return (
    <SubscribeInfoContainer>
      <SubscribeInfoCard
        title="회원권 기간"
        data={subData.end_date}
        color="#3d5956"
      />
      <SubscribeInfoCard
        title="PT 잔여 일수"
        data={subData.pt_remain_count}
        color="#c59234"
      />
    </SubscribeInfoContainer>
  )
}

const SubscribeInfoContainer = styled.section`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  padding-left: 9.5rem;
`
