import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { Nav } from './components'
import { Login, KakaoLogin, SignUp, Management, Chart, Account } from './pages'
import {
  MainDefault,
  Attendance,
  Diet,
  ExercisePlan,
  InbodyResister,
} from './components'
import { authActions } from './store/auth'

export default function Router() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const isAuthentication = useSelector((state) => state.auth.isAuthentication)
  const pathname = location.pathname

  // 로그인이 되어있지 않다면 로그인 페이지로 이동시킴
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/initial/login`,
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'not found') {
          navigation('/', { replace: true })
          return
        }
        const loginInfo = {
          name: res.data.data.name,
          profile: res.data.data.profile,
          type: res.data.data.type,
        }

        dispatch(authActions.login(loginInfo))
      })
      .catch((err) => console.log(err))

    if (
      !isAuthentication &&
      pathname !== '/' &&
      pathname !== '/signup' &&
      pathname !== '/kakaologin'
    ) {
      navigation('/', { replace: true })
    }
  }, [dispatch, isAuthentication, navigation, pathname])

  return (
    <RouterContainer>
      {location.pathname !== '/' && location.pathname !== '/signup' && <Nav />}
      <MainContainer>
        <MainFrame
          path={location.pathname !== '/' && location.pathname !== '/signup'}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/kakaologin" element={<KakaoLogin />} />
            <Route path="management" element={<Management />}>
              <Route path="" element={<MainDefault />} />
              <Route path="diet" element={<Diet />} />
              <Route path="inbodyresister" element={<InbodyResister />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="exerciseplan" element={<ExercisePlan />} />
            </Route>
            <Route path="chart" element={<Chart />} />
            <Route path="account" element={<Account />} />
            <Route path="member" element={<div>Member</div>} />
          </Routes>
        </MainFrame>
      </MainContainer>
    </RouterContainer>
  )
}

const RouterContainer = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
`

const MainContainer = styled.div`
  width: 100vw;
  padding: 1rem;
  background-color: black;
`
const MainFrame = styled.div`
  flex-shrink: 0;
  width: ${({ path }) => (!path ? 'calc(100vw - 2rem)' : 'calc(100vw - 9rem)')};
  height: 96vh;
  border-radius: 1rem;
  background-color: white;
  overflow: scroll;
  box-shadow: inset 0.2rem 0.2rem 0.3rem gray;
`
