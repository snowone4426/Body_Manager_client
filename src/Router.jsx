import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Nav } from './components'
import { Management, Login } from './pages'

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
        <Route path="/management" element={<Management />} />
      </Routes>
    </RouterContainer>
  )
}

const RouterContainer = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
`
