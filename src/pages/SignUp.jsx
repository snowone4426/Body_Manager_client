import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { SignUpSkeleton } from '../components'
import { Validation } from '../hooks/validation'

export default function SignUp() {
  const location = useLocation()
  const navigation = useNavigate()
  const [memberInfo, setMemberInfo] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    phone: '',
    gender: 'M',
    height: '',
    remark: '',
    birth: '',
    profile: '',
  })
  const [validationCheck, setValidationCheck] = useState({
    email: false,
    phone: false,
    password: false,
    birth: false,
    name: false,
  })

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
        validationCheckHanlder(key, e.target.value)
        return
      default:
        setMemberInfo({ ...memberInfo, [key]: e.target.value })
        validationCheckHanlder(key, e.target.value)
    }
  }

  const submitHanlder = async () => {
    let valCheck = true

    Object.entries(validationCheck).forEach((el) => {
      if (valCheck && el[1]) {
        valCheck = false
        alert(el[0] + '를 확인해 주세요')
      }
    })

    if (!valCheck) {
      return
    }

    const formData = new FormData()

    Object.keys(memberInfo).forEach((el) => {
      if (el === 'phone') {
        formData.append(el, memberInfo[el].split('-').join(''))
        return
      }
      formData.append(el, memberInfo[el])
    })

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/initial/join`, formData)
      .then((res) => {
        if (res.data.message === 'ok') {
          alert('회원가입에 성공하였습니다')
          navigation('/', { replace: true })
        } else {
          alert('다시 시도해 주세요')
        }
      })
      .catch((err) => {
        console.log(err)
        alert('다시 시도해 주세요')
      })
  }

  const validationCheckHanlder = (type, value) => {
    let inputValue = value

    if (type === 'phone') {
      inputValue = inputValue.split('-').join('')
    }

    const result = Validation(type, value)

    if (result) {
      setValidationCheck({
        ...validationCheck,
        [type]: result,
      })
      return
    }

    switch (type) {
      case 'phone':
      case 'email':
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/initial/${type}check`, {
            [type]: inputValue,
          })
          .then((res) => {
            setValidationCheck({
              ...validationCheck,
              [type]: res.data.message !== 'ok',
            })
          })
          .catch((err) => {
            console.log(err)
            setValidationCheck({
              ...validationCheck,
              [type]: true,
            })
          })
        return
      default:
        setValidationCheck({
          ...validationCheck,
          [type]: result,
        })
        return
    }
  }

  return (
    <SignUpSkeleton
      memberInfo={memberInfo}
      inputFn={infoHanlder}
      submitFn={submitHanlder}
      validationCheck={validationCheck}
    />
  )
}
