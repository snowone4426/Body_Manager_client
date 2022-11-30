import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Nav } from './components'
import { Management, Login } from './pages'
import {
  MainDefault,
  Attendance,
  Diet,
  ExercisePlan,
  InbodyResister,
} from './components'

export default function Router() {
  const location = useLocation()
  const navigation = useNavigate()
  const isAuthentication = useSelector((state) => state.auth.isAuthentication)

  useEffect(() => {
    if (!isAuthentication && location.pathname !== '/') {
      navigation('/', { replace: true })
    }
  }, [])

  return (
    <RouterContainer>
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="management" element={<Management />}>
          <Route path="" element={<MainDefault />} />
          <Route path="diet" element={<Diet />} />
          <Route path="inbodyresister" element={<InbodyResister />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exerciseplan" element={<ExercisePlan />} />
        </Route>
        <Route path="chart" element={<div>Chart</div>} />
        <Route path="account" element={<div>Account</div>} />
        <Route path="member" element={<div>Member</div>} />
      </Routes>
    </RouterContainer>
  )
}

const RouterContainer = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
`
