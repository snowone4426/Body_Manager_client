import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function InbodyResister() {
  const navigation = useNavigate()
  const [inbody, setInbody] = useState({
    weight: '',
    SMM: '',
    BFM: '',
    BMI: '',
    PBF: '',
    WHR: '',
    BMR: '',
    body_muscle: '',
    left_hand_muscle: '',
    right_hand_muscle: '',
    left_leg_muscle: '',
    right_leg_muscle: '',
    body_fat: '',
    left_hand_fat: '',
    right_hand_fat: '',
    left_leg_fat: '',
    right_leg_fat: '',
  })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/inbody/data`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          setInbody({
            weight: res.data.data.weight,
            SMM: res.data.data.SMM,
            BFM: res.data.data.BFM,
            BMI: res.data.data.BMI,
            PBF: res.data.data.PBF,
            WHR: res.data.data.WHR,
            BMR: res.data.data.BMR,
            body_muscle: res.data.data.body_muscle,
            left_hand_muscle: res.data.data.left_hand_muscle,
            right_hand_muscle: res.data.data.right_hand_muscle,
            left_leg_muscle: res.data.data.left_leg_muscle,
            right_leg_muscle: res.data.data.right_hand_muscle,
            body_fat: res.data.data.body_fat,
            left_hand_fat: res.data.data.left_hand_fat,
            right_hand_fat: res.data.data.right_hand_fat,
            left_leg_fat: res.data.data.left_hand_fat,
            right_leg_fat: res.data.data.right_hand_fat,
          })
        }
      })
      .catch((err) => console.log(err))
    // const message = 'ok'
    // if (message === 'ok') {
    //   setInbody({
    //     weight: 1,
    //     SMM: 2,
    //     BFM: 3,
    //     BMI: 4,
    //     PBF: 5,
    //     WHR: 6,
    //     BMR: 7,
    //     body_muscle: 8,
    //     left_hand_muscle: 9,
    //     right_hand_muscle: 10,
    //     left_leg_muscle: 11,
    //     right_leg_muscle: 12,
    //     body_fat: 13,
    //     left_hand_fat: 14,
    //     right_hand_fat: 15,
    //     left_leg_fat: 16,
    //     right_leg_fat: 17,
    //   })
    // }
  }, [])

  const inbodyHanlder = (e) => {
    const key = e.target.name
    const value = e.target.value
    setInbody({ ...inbody, [key]: value })
  }

  const submitHanlder = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/inbody/register`, inbody)
      .then((res) => {
        if (res.data.message === 'ok') navigation('/management')
      })
      .catch((err) => console.log(err))
    // alert('등록')
    // navigation('/management')
  }

  return (
    <InbodyResisterContainer>
      <InbodyResisterFrame>
        <InbodyTitle>Inbody Resister</InbodyTitle>
        <InputBox>
          <InputListBox>
            {Object.keys(inbody)
              .slice(0, Object.keys(inbody).length / 2)
              .map((el) => (
                <InputList key={el}>
                  <InputLabel>
                    {el}
                    <Input
                      type="number"
                      onChange={inbodyHanlder}
                      name={el}
                      value={inbody[el]}
                    />
                  </InputLabel>
                </InputList>
              ))}
          </InputListBox>
          <InputListBox>
            {Object.keys(inbody)
              .slice(
                Object.keys(inbody).length / 2,
                Object.keys(inbody).length - 1,
              )
              .map((el) => (
                <InputList key={el}>
                  <InputLabel>
                    {el}
                    <Input
                      type="number"
                      onChange={inbodyHanlder}
                      name={el}
                      value={inbody[el]}
                    />
                  </InputLabel>
                </InputList>
              ))}
          </InputListBox>
        </InputBox>
        <SubmitBtn onClick={submitHanlder}>등 록</SubmitBtn>
      </InbodyResisterFrame>
    </InbodyResisterContainer>
  )
}

const InbodyResisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const InbodyResisterFrame = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.7rem;
  padding: 1.5rem;
  box-shadow: 0.2rem 0.2rem 0.7rem #d7d7d7;
`

const InbodyTitle = styled.h1`
  align-self: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem;
`

const InputBox = styled.div`
  display: flex;
`
const InputListBox = styled.ul`
  margin: 1rem;
`

const InputList = styled.li``

const InputLabel = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  border-bottom: 1px solid gray;
  margin-bottom: 0.5rem;
`

const Input = styled.input`
  text-align: end;
`
const SubmitBtn = styled.button`
  align-self: center;
  width: 5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  border-radius: 0.5rem;
  padding: 0.4rem;
  background-color: #717171;
`
