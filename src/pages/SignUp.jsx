import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { SignUpSkeleton } from '../components'

export default function SignUp() {
  const location = useLocation()
  const navigation = useNavigate()
  const [memberInfo, setMemberInfo] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    gender: '',
    height: '',
    remark: '',
    birth: '',
    profile: '',
  })
  const [isDubplicate, setIsDuplicate] = useState({ email: '', phone: '' })

  useEffect(() => {
    if (location.state !== null) {
      const info = location.state

      setMemberInfo({
        ...memberInfo,
        email: info.email,
        gender: info.gender,
        birth: info.birth,
      })
    }
  }, [])

  const infoHanlder = (e, key) => {
    switch (key) {
      case 'profile':
        setMemberInfo({ ...memberInfo, [key]: e.target.files[0] })
        return
      case 'address':
        setMemberInfo({ ...memberInfo, [key]: e })
        return
      case 'email':
      case 'phone':
        setMemberInfo({ ...memberInfo, [key]: e.target.value })
        setIsDuplicate({
          ...isDubplicate,
          [key]: duplicateCheckHanlder(key) !== 'ok',
        })

        return
      default:
        setMemberInfo({ ...memberInfo, [key]: e.target.value })
    }
  }

  const submitHanlder = () => {
    const formData = new FormData()

    Object.keys(memberInfo).forEach((el) => formData.append(el, memberInfo[el]))

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/join`, formData)
      .then((res) => {
        if (res.data.message === 'ok') {
          navigation('/', { replace: true })
        }
      })
      .catch((err) => console.log(err))
  }

  const duplicateCheckHanlder = (type) => {
    let result = ''

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/${type}check`, {
        [type]: memberInfo[type],
      })
      .then((res) => {
        result = res.data.message
      })
      .catch((err) => console.log(err))

    return result
  }

  return (
    <SignUpSkeleton
      memberInfo={memberInfo}
      inputFn={infoHanlder}
      submitFn={submitHanlder}
      isDubplicate={isDubplicate}
    />
  )
}
