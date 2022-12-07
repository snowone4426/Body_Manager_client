import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { authActions } from '../store/auth'

export default function KakaoLogin() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const code = location.search.split('=')[1]
    const sendToken = (access_token) => {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/sociallogin`, {
          access_token: access_token,
        })
        .then((res) => {
          switch (res.data.message) {
            case 'not signup':
              navigate('/signup', {
                state: {
                  email: res.data.data.email,
                  gender: res.data.data.gender,
                  birth: res.data.data.birth,
                },
                replace: true,
              })
              break
            case 'login':
              dispatch(authActions.login())
              navigate('/management', { replace: true })
              navigate('/management', {
                replace: true,
              })
              break
            default:
              navigate('/', { replace: true })
          }
        })
        .catch((err) => console.log(err))
    }

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAOKEY}&redirect_uri=${process.env.REACT_APP_CLIENT_URL}/kakaologin&code=${code}&client_secret=${process.env.REACT_APP_KAKAOSECRET}`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((res) => sendToken(res.data.access_token))
  }, [dispatch, location, navigate])
}
