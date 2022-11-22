import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import { Nav } from './components'
import Main from './pages/Main'

export default function Router() {
  return (
    <RouterContainer>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </RouterContainer>
  )
}

const RouterContainer = styled.div``
